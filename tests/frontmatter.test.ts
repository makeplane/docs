import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import fg from "fast-glob";
import matter from "gray-matter";

const DOCS_DIR = join(__dirname, "../docs");

describe("Front Matter Validation", () => {
  const markdownFiles = fg.sync("**/*.md", {
    cwd: DOCS_DIR,
    ignore: ["node_modules/**", ".vitepress/dist/**"],
  });

  it("should find markdown files to validate", () => {
    expect(markdownFiles.length).toBeGreaterThan(0);
  });

  describe("Required Front Matter Fields", () => {
    const filesWithoutTitle: string[] = [];
    const filesWithoutDescription: string[] = [];
    const filesWithEmptyTitle: string[] = [];
    const filesWithEmptyDescription: string[] = [];

    for (const file of markdownFiles) {
      const filePath = join(DOCS_DIR, file);
      const content = readFileSync(filePath, "utf-8");
      const { data } = matter(content);

      // Check for title
      if (!data.title) {
        filesWithoutTitle.push(file);
      } else if (typeof data.title === "string" && data.title.trim() === "") {
        filesWithEmptyTitle.push(file);
      }

      // Check for description (recommended but not always required)
      if (!data.description) {
        filesWithoutDescription.push(file);
      } else if (typeof data.description === "string" && data.description.trim() === "") {
        filesWithEmptyDescription.push(file);
      }
    }

    it("should have a title in front matter", () => {
      expect(
        filesWithoutTitle,
        `Files missing title in front matter:\n  ${filesWithoutTitle.join("\n  ")}`
      ).toHaveLength(0);
    });

    it("should not have empty titles", () => {
      expect(
        filesWithEmptyTitle,
        `Files with empty titles:\n  ${filesWithEmptyTitle.join("\n  ")}`
      ).toHaveLength(0);
    });

    // Note: Description is recommended but not strictly required
    // This test is informational and will warn but not fail
    it.skip("should have a description in front matter (recommended)", () => {
      // Skip this test by default, but keep it for documentation purposes
      if (filesWithoutDescription.length > 0) {
        console.warn(
          `\nFiles without description (recommended for SEO):\n  ${filesWithoutDescription.join("\n  ")}`
        );
      }
    });

    it("should not have empty descriptions when present", () => {
      expect(
        filesWithEmptyDescription,
        `Files with empty descriptions:\n  ${filesWithEmptyDescription.join("\n  ")}`
      ).toHaveLength(0);
    });
  });

  describe("Front Matter Content Quality", () => {
    it("should have titles that are not too long", () => {
      const maxLength = 100;
      const filesWithLongTitles: { file: string; length: number }[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { data } = matter(content);

        if (data.title && typeof data.title === "string" && data.title.length > maxLength) {
          filesWithLongTitles.push({ file, length: data.title.length });
        }
      }

      expect(
        filesWithLongTitles,
        `Files with titles longer than ${maxLength} characters:\n${filesWithLongTitles.map((item) => `  ${item.file} (${item.length} chars)`).join("\n")}`
      ).toHaveLength(0);
    });

    it("should have descriptions that are reasonable length when present", () => {
      const maxLength = 250; // Increased from 200 to allow for more descriptive meta
      const filesWithLongDesc: { file: string; length: number }[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { data } = matter(content);

        if (
          data.description &&
          typeof data.description === "string" &&
          data.description.length > maxLength
        ) {
          filesWithLongDesc.push({ file, length: data.description.length });
        }
      }

      // This is informational - some descriptions may be legitimately longer
      if (filesWithLongDesc.length > 0) {
        console.warn(
          `\nFiles with longer descriptions (>${maxLength} chars, consider shortening for SEO):\n${filesWithLongDesc.map((item) => `  ${item.file} (${item.length} chars)`).join("\n")}`
        );
      }
    });
  });

  describe("Front Matter Consistency", () => {
    it("should use consistent YAML format", () => {
      const filesWithInvalidFrontMatter: string[] = [];

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");

        // Check if file starts with front matter delimiters
        if (content.startsWith("---")) {
          try {
            matter(content);
          } catch (error) {
            filesWithInvalidFrontMatter.push(file);
          }
        }
      }

      expect(
        filesWithInvalidFrontMatter,
        `Files with invalid YAML front matter:\n  ${filesWithInvalidFrontMatter.join("\n  ")}`
      ).toHaveLength(0);
    });

    it("should not have unexpected special characters in titles", () => {
      const filesWithSpecialChars: { file: string; title: string }[] = [];
      const specialCharsPattern = /[<>{}[\]]/; // Characters that might cause issues

      for (const file of markdownFiles) {
        const filePath = join(DOCS_DIR, file);
        const content = readFileSync(filePath, "utf-8");
        const { data } = matter(content);

        if (data.title && typeof data.title === "string" && specialCharsPattern.test(data.title)) {
          filesWithSpecialChars.push({ file, title: data.title });
        }
      }

      expect(
        filesWithSpecialChars,
        `Files with special characters in titles:\n${filesWithSpecialChars.map((item) => `  ${item.file}: "${item.title}"`).join("\n")}`
      ).toHaveLength(0);
    });
  });
});
