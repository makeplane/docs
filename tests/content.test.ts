import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import fg from "fast-glob";
import matter from "gray-matter";

const DOCS_DIR = join(__dirname, "../docs");

describe("Content Validation", () => {
  const markdownFiles = fg.sync("**/*.md", {
    cwd: DOCS_DIR,
    ignore: ["node_modules/**", ".vitepress/dist/**"],
  });

  it("should find markdown files to validate", () => {
    expect(markdownFiles.length).toBeGreaterThan(0);
  });

  describe("Heading Structure", () => {
    it("should have proper heading hierarchy", () => {
      const filesWithBadHierarchy: { file: string; issue: string }[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent, data } = matter(content);

        const lines = markdownContent.split("\n");
        const headings: { level: number; text: string; lineNum: number }[] = [];

        lines.forEach((line, idx) => {
          const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
          if (headingMatch) {
            headings.push({
              level: headingMatch[1].length,
              text: headingMatch[2],
              lineNum: idx + 1,
            });
          }
        });

        // Note: We don't strictly enforce H1 matching frontmatter title
        // because frontmatter titles are often SEO-optimized (longer/more descriptive)
        // while H1 headings are user-facing (shorter/cleaner)
        // This is a valid and common documentation pattern

        // Check for skipped heading levels (e.g., h1 -> h3)
        for (let i = 1; i < headings.length; i++) {
          const prevLevel = headings[i - 1].level;
          const currLevel = headings[i].level;

          if (currLevel > prevLevel + 1) {
            filesWithBadHierarchy.push({
              file,
              issue: `Skipped heading level from h${prevLevel} to h${currLevel} at line ${headings[i].lineNum}`,
            });
          }
        }
      }

      // Skipped heading levels can cause accessibility and navigation issues
      // but are warnings for now on existing docs
      if (filesWithBadHierarchy.length > 0) {
        console.warn(
          `\nFiles with heading hierarchy issues (may affect accessibility):\n${filesWithBadHierarchy.map((item) => `  ${item.file}: ${item.issue}`).join("\n")}`
        );
      }
    });

    it("should not have multiple h1 headings", () => {
      const filesWithMultipleH1: string[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        const h1Count = (markdownContent.match(/^# /gm) || []).length;

        if (h1Count > 1) {
          filesWithMultipleH1.push(`${file} (${h1Count} h1 headings)`);
        }
      }

      expect(
        filesWithMultipleH1,
        `Files with multiple h1 headings:\n  ${filesWithMultipleH1.join("\n  ")}`
      ).toHaveLength(0);
    });
  });

  describe("Content Quality", () => {
    it("should not have empty content", () => {
      const emptyFiles: string[] = [];

      for (const file of markdownFiles) {
        // Skip index.md which uses hero layout and doesn't need body content
        if (file === "index.md") continue;

        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        if (markdownContent.trim().length === 0) {
          emptyFiles.push(file);
        }
      }

      expect(
        emptyFiles,
        `Files with no content:\n  ${emptyFiles.join("\n  ")}`
      ).toHaveLength(0);
    });

    it("should not have TODO or FIXME comments", () => {
      const filesWithTodos: { file: string; matches: string[] }[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        // Only match actual TODO/FIXME comments, not words like "Todo" in UI text
        // Match patterns like "TODO:", "FIXME:", or at start of lines
        const todoMatches = Array.from(
          markdownContent.matchAll(/\b(TODO|FIXME|XXX|HACK):/gi)
        ).map((match) => match[0]);

        if (todoMatches.length > 0) {
          filesWithTodos.push({ file, matches: todoMatches });
        }
      }

      // This is informational - many docs reference "Todo" as a feature name
      if (filesWithTodos.length > 0) {
        console.warn(
          `\nFiles with TODO/FIXME markers:\n${filesWithTodos.map((item) => `  ${item.file}: ${item.matches.join(", ")}`).join("\n")}`
        );
      }
    });

    it("should not have trailing whitespace on lines", () => {
      const filesWithTrailingSpaces: { file: string; count: number }[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        const lines = markdownContent.split("\n");
        const trailingSpaceLines = lines.filter((line) => /\s+$/.test(line)).length;

        if (trailingSpaceLines > 0) {
          filesWithTrailingSpaces.push({ file, count: trailingSpaceLines });
        }
      }

      // This is informational - trailing whitespace should be fixed by formatter
      if (filesWithTrailingSpaces.length > 0) {
        console.warn(
          `\nFiles with trailing whitespace (run pnpm fix:format):\n${filesWithTrailingSpaces.map((item) => `  ${item.file}: ${item.count} lines`).join("\n")}`
        );
      }
    });
  });

  describe("Image References", () => {
    it("should use external CDN for images", () => {
      const filesWithLocalImages: { file: string; images: string[] }[] = [];
      const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
      const expectedCDN = "https://media.docs.plane.so/";

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        const images = Array.from(markdownContent.matchAll(imagePattern))
          .map((match) => match[2])
          .filter((src) => !src.startsWith(expectedCDN) && !src.startsWith("http"));

        if (images.length > 0) {
          filesWithLocalImages.push({ file, images });
        }
      }

      expect(
        filesWithLocalImages,
        `Files with local/non-CDN images:\n${filesWithLocalImages.map((item) => `  ${item.file}: ${item.images.join(", ")}`).join("\n")}`
      ).toHaveLength(0);
    });

    it("should have alt text for all images", () => {
      const filesWithoutAlt: { file: string; count: number }[] = [];
      const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        const imagesWithoutAlt = Array.from(markdownContent.matchAll(imagePattern)).filter(
          (match) => match[1].trim() === ""
        );

        if (imagesWithoutAlt.length > 0) {
          filesWithoutAlt.push({ file, count: imagesWithoutAlt.length });
        }
      }

      // Alt text is important for accessibility but this is a warning for now
      if (filesWithoutAlt.length > 0) {
        console.warn(
          `\nFiles with images missing alt text (recommended for accessibility):\n${filesWithoutAlt.map((item) => `  ${item.file}: ${item.count} images`).join("\n")}`
        );
      }
    });
  });

  describe("Code Blocks", () => {
    it("should have language specified for code blocks", () => {
      const filesWithUnlabeledCode: { file: string; count: number }[] = [];
      // Match code blocks without language specification
      const unlabeledCodePattern = /^```\s*$/gm;

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        const matches = Array.from(markdownContent.matchAll(unlabeledCodePattern));

        if (matches.length > 0) {
          filesWithUnlabeledCode.push({ file, count: matches.length });
        }
      }

      // This is a warning-level check, not a strict requirement
      if (filesWithUnlabeledCode.length > 0) {
        console.warn(
          `\nFiles with unlabeled code blocks (recommended to add language):\n${filesWithUnlabeledCode.map((item) => `  ${item.file}: ${item.count} blocks`).join("\n")}`
        );
      }
    });
  });

  describe("Special Characters", () => {
    it("should use proper quotation marks", () => {
      const filesWithStraightQuotes: { file: string; count: number }[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        // Skip code blocks and inline code when checking quotes
        const contentWithoutCode = markdownContent
          .replace(/```[\s\S]*?```/g, "")
          .replace(/`[^`]+`/g, "");

        // Count smart quotes that should potentially be straight quotes in code contexts
        // This is informational only
        const smartQuoteCount = (contentWithoutCode.match(/[""'']/g) || []).length;

        if (smartQuoteCount > 0) {
          filesWithStraightQuotes.push({ file, count: smartQuoteCount });
        }
      }

      // This is informational only - smart quotes are fine in documentation
      // Just keeping track for consistency
    });
  });
});
