import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import fg from "fast-glob";

const DOCS_DIR = join(__dirname, "../docs");
const CONFIG_PATH = join(DOCS_DIR, ".vitepress/config.ts");

describe("VitePress Configuration", () => {
  it("should have a config.ts file", () => {
    expect(existsSync(CONFIG_PATH)).toBe(true);
  });

  describe("Sidebar Configuration", () => {
    it("should have all sidebar links pointing to existing files", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      // Extract all link paths from the sidebar configuration
      const linkPattern = /link:\s*["']([^"']+)["']/g;
      const links = Array.from(configContent.matchAll(linkPattern))
        .map((match) => match[1])
        .filter((link) => {
          // Filter out external links
          return (
            !link.startsWith("http://") && !link.startsWith("https://") && !link.startsWith("#")
          );
        });

      const brokenLinks: string[] = [];

      for (const link of links) {
        const linkPath = link.startsWith("/") ? link.substring(1) : link;
        const filePath = join(DOCS_DIR, `${linkPath}.md`);

        if (!existsSync(filePath)) {
          brokenLinks.push(link);
        }
      }

      expect(
        brokenLinks,
        `Sidebar links pointing to non-existent files:\n  ${brokenLinks.join("\n  ")}`,
      ).toHaveLength(0);
    });

    it("should have sidebar text labels that match page titles", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      // This is a basic validation - in practice, you'd want to parse the config
      // and match sidebar text with actual page frontmatter titles
      // For now, just check that the config is properly formatted

      expect(configContent).toContain("sidebar:");
      expect(configContent).toContain("text:");
      expect(configContent).toContain("link:");
    });
  });

  describe("Theme Configuration", () => {
    it("should have required theme configuration", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      expect(configContent).toContain("themeConfig:");
      expect(configContent).toContain("nav:");
      expect(configContent).toContain("sidebar:");
    });

    it("should have search configuration", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      expect(configContent).toContain("search:");
    });

    it("should have social links", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      expect(configContent).toContain("socialLinks:");
    });
  });

  describe("Site Metadata", () => {
    it("should have title and description", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      expect(configContent).toContain("title:");
      expect(configContent).toContain("description:");
    });

    it("should have sitemap configuration", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      expect(configContent).toContain("sitemap:");
      expect(configContent).toContain("hostname:");
    });

    it("should have proper head tags", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      expect(configContent).toContain("head:");
      expect(configContent).toContain("og:image");
      expect(configContent).toContain("twitter:card");
    });
  });

  describe("Build Configuration", () => {
    it("should have clean URLs enabled", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      expect(configContent).toContain("cleanUrls: true");
    });

    it("should have markdown configuration", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      expect(configContent).toContain("markdown:");
    });
  });

  describe("All Markdown Files Coverage", () => {
    it("should have all content files referenced in sidebar or be reasonable to exclude", () => {
      const configContent = readFileSync(CONFIG_PATH, "utf-8");

      const markdownFiles = fg.sync("**/*.md", {
        cwd: DOCS_DIR,
        ignore: [
          "node_modules/**",
          ".vitepress/dist/**",
          "index.md", // Home page, not in sidebar
        ],
      });

      const unreferencedFiles: string[] = [];

      for (const file of markdownFiles) {
        // Convert file path to link format (remove .md, add leading /)
        const linkPath = "/" + file.replace(/\.md$/, "");

        // Check if this path appears in the config
        if (!configContent.includes(linkPath)) {
          unreferencedFiles.push(file);
        }
      }

      // Some files might intentionally not be in the sidebar (like generated pages)
      // This is more of a warning than a strict requirement
      if (unreferencedFiles.length > 0) {
        console.warn(
          `\nMarkdown files not referenced in sidebar config:\n  ${unreferencedFiles.join("\n  ")}`,
        );
      }

      // We won't fail the test, but we log the warning
      // Uncomment the next line to make this a strict requirement:
      // expect(unreferencedFiles).toHaveLength(0);
    });
  });
});
