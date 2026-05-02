import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, statSync } from "fs";
import { join, resolve, dirname } from "path";
import fg from "fast-glob";
import matter from "gray-matter";

const DOCS_DIR = resolve(__dirname, "../docs");

describe("Link Validation", () => {
  const markdownFiles = fg.sync("**/*.md", {
    cwd: DOCS_DIR,
    ignore: ["node_modules/**", ".vitepress/dist/**"],
  });

  it("should find markdown files", () => {
    expect(markdownFiles.length).toBeGreaterThan(0);
  });

  describe("Internal Links", () => {
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const internalLinks = new Map<string, { file: string; link: string; text: string }[]>();

    // Extract all internal links from markdown files
    for (const file of markdownFiles) {
      const filePath = join(DOCS_DIR, file);
      const content = readFileSync(filePath, "utf-8");
      const { content: markdownContent } = matter(content);

      const matches = Array.from(markdownContent.matchAll(linkPattern));

      for (const match of matches) {
        const [, text, link] = match;
        // Skip external links, anchors without paths, and mailto links
        if (
          link.startsWith("http://") ||
          link.startsWith("https://") ||
          link.startsWith("mailto:") ||
          link.startsWith("#")
        ) {
          continue;
        }

        if (!internalLinks.has(file)) {
          internalLinks.set(file, []);
        }
        internalLinks.get(file)!.push({ file, link, text });
      }
    }

    it("should have internal links to validate", () => {
      const totalLinks = Array.from(internalLinks.values()).reduce(
        (sum, links) => sum + links.length,
        0
      );
      expect(totalLinks).toBeGreaterThan(0);
    });

    for (const [file, links] of internalLinks) {
      describe(`Links in ${file}`, () => {
        for (const { link, text } of links) {
          it(`should resolve link: "${text}" -> ${link}`, () => {
            const sourceDir = dirname(join(DOCS_DIR, file));

            // Handle anchor links with paths
            const [path, anchor] = link.split("#");
            const linkPath = path || file;

            // Resolve relative links
            let targetPath: string;
            if (linkPath.startsWith("/")) {
              // Absolute path from docs root
              targetPath = join(DOCS_DIR, linkPath);
            } else {
              // Relative path from source file
              targetPath = resolve(sourceDir, linkPath);
            }

            // Check if it's a directory (should have index.md) or file
            if (existsSync(targetPath)) {
              const stat = statSync(targetPath);
              if (stat.isDirectory()) {
                const indexPath = join(targetPath, "index.md");
                expect(
                  existsSync(indexPath),
                  `Directory link ${link} should have index.md at ${indexPath}`
                ).toBe(true);
              }
              // If it's a file, it exists - test passes
            } else {
              // Try with .md extension
              const mdPath = targetPath.endsWith(".md") ? targetPath : `${targetPath}.md`;
              expect(
                existsSync(mdPath),
                `Link ${link} should resolve to existing file. Tried: ${targetPath} and ${mdPath}`
              ).toBe(true);
            }
          });
        }
      });
    }
  });

  describe("Duplicate Links", () => {
    it("should not have links with .md extensions", () => {
      const filesWithMdLinks: string[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        // Check for internal links with .md extension
        const mdLinkPattern = /\[([^\]]+)\]\((?!https?:\/\/)([^)]*\.md[^)]*)\)/g;
        const matches = Array.from(markdownContent.matchAll(mdLinkPattern));

        if (matches.length > 0) {
          filesWithMdLinks.push(file);
        }
      }

      expect(
        filesWithMdLinks,
        `Files with .md extensions in links: ${filesWithMdLinks.join(", ")}`
      ).toHaveLength(0);
    });
  });

  describe("External Links", () => {
    it("should use https for external links (not http)", () => {
      const filesWithHttp: { file: string; links: string[] }[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { content: markdownContent } = matter(content);

        // Find http links (excluding localhost and specific allowed domains)
        const httpLinks = Array.from(
          markdownContent.matchAll(/\[([^\]]+)\]\((http:\/\/[^)]+)\)/g)
        )
          .map((match) => match[2])
          .filter(
            (link) =>
              !link.includes("localhost") &&
              !link.includes("127.0.0.1") &&
              !link.includes("example.com") // Allow example domains in docs
          );

        if (httpLinks.length > 0) {
          filesWithHttp.push({ file, links: httpLinks });
        }
      }

      if (filesWithHttp.length > 0) {
        const details = filesWithHttp
          .map((item) => `  ${item.file}: ${item.links.join(", ")}`)
          .join("\n");
        expect(filesWithHttp, `Files with http:// links:\n${details}`).toHaveLength(0);
      }
    });
  });
});
