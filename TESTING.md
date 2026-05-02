# Testing Documentation

## Overview

This repository includes a comprehensive automated test suite to ensure documentation quality, consistency, and correctness.

## Test Framework

- **Framework**: Vitest 4.1.5
- **Environment**: happy-dom
- **Test Files**: 4 test suites
- **Total Tests**: 230+ tests
- **Coverage**: Available via `pnpm test:coverage`

## Running Tests

### Basic Commands

```bash
# Run all tests (used in CI)
pnpm test

# Run tests in watch mode (for development)
pnpm test:watch

# Run tests with interactive UI
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage
```

### CI Integration

Tests run automatically on all pull requests as part of the CI workflow:

1. **Format Check** - `pnpm check:format`
2. **Tests** - `pnpm test`
3. **Build** - `pnpm build`

## Test Suites

### 1. Link Validation (`tests/links.test.ts`)

Ensures all internal links are valid and follow documentation conventions.

**What it checks:**
- ✅ All internal links resolve to existing files
- ✅ Links don't use `.md` extensions (VitePress removes them)
- ✅ External links use HTTPS instead of HTTP
- ✅ No broken relative or absolute paths

**Example failures:**
```
❌ Link to /core-concepts/nonexistent points to missing file
❌ Link [Guide](./guide.md) should be [Guide](./guide)
❌ External link uses http:// instead of https://
```

### 2. Front Matter Validation (`tests/frontmatter.test.ts`)

Validates YAML front matter metadata for all markdown files.

**What it checks:**
- ✅ All pages have a `title` field
- ✅ Titles are not empty or too long (max 100 chars)
- ✅ Descriptions are reasonable length (max 250 chars recommended)
- ✅ YAML syntax is valid
- ✅ No unexpected special characters in titles

**Example failures:**
```
❌ File missing title in front matter
❌ Title is empty or only whitespace
❌ Description exceeds 250 characters (SEO warning)
❌ Invalid YAML syntax in front matter
```

### 3. Content Validation (`tests/content.test.ts`)

Validates markdown content structure and quality.

**What it checks:**
- ✅ Proper heading hierarchy (warns about skipped levels)
- ✅ No empty content files (except home page)
- ✅ Images use external CDN (`https://media.docs.plane.so/`)
- ✅ Images have alt text (accessibility recommendation)
- ✅ No trailing whitespace (formatting)
- ✅ Code blocks have language labels (recommended)

**Example failures:**
```
❌ Heading jumps from h2 to h4 (skipped h3)
❌ File has no content after front matter
❌ Image uses local path instead of CDN
⚠️  Image missing alt text (accessibility)
⚠️  Trailing whitespace detected (run formatter)
```

### 4. Configuration Validation (`tests/config.test.ts`)

Validates VitePress configuration integrity.

**What it checks:**
- ✅ Config file exists and is readable
- ✅ Sidebar links point to existing files
- ✅ Required theme configuration present
- ✅ Search configuration exists
- ✅ Social links configured
- ✅ Site metadata (title, description, sitemap)
- ✅ Proper head tags for SEO

**Example failures:**
```
❌ Sidebar link /core-concepts/missing points to non-existent file
❌ Missing required theme configuration
❌ Sitemap hostname not configured
```

## Test Philosophy

### Strict Checks (Failures)

These tests will fail the build and must be fixed:

- Broken internal links
- Missing required front matter fields
- Invalid YAML syntax
- Images using local paths instead of CDN
- Empty titles or invalid characters
- Broken sidebar configuration

### Warnings (Non-Blocking)

These tests provide helpful warnings but don't fail the build:

- Skipped heading levels (accessibility concern)
- Images without alt text (accessibility recommendation)
- Trailing whitespace (formatting, fixable with formatter)
- Long descriptions (SEO optimization suggestion)
- Unlabeled code blocks (readability suggestion)

## Current Test Results

As of the initial implementation:

- ✅ **230 tests passing**
- ⚠️  9 files with heading hierarchy issues
- ⚠️  45 files with trailing whitespace (fixable with `pnpm fix:format`)
- ⚠️  2 files with images missing alt text
- ⚠️  2 files with descriptions over recommended length

## Adding New Tests

### Example Test Structure

```typescript
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import fg from "fast-glob";

describe("My Test Suite", () => {
  const markdownFiles = fg.sync("**/*.md", {
    cwd: join(__dirname, "../docs"),
    ignore: ["node_modules/**", ".vitepress/dist/**"],
  });

  it("should validate something", () => {
    for (const file of markdownFiles) {
      // Your validation logic
    }
    expect(issues).toHaveLength(0);
  });
});
```

### Best Practices

1. **Group related tests** - Use `describe` blocks to organize tests
2. **Clear error messages** - Include file names and specific issues in failures
3. **Informational warnings** - Use `console.warn()` for non-critical issues
4. **Fast execution** - Tests should run in under 2 seconds total
5. **No false positives** - Ensure tests account for valid patterns

## Troubleshooting

### Tests failing locally

```bash
# Ensure dependencies are installed
pnpm install

# Run tests with verbose output
pnpm test -- --reporter=verbose

# Run specific test file
pnpm test tests/links.test.ts
```

### Tests passing locally but failing in CI

```bash
# Ensure you've committed all files
git status

# Run the exact CI commands
pnpm install --frozen-lockfile
pnpm test
pnpm build
```

### Common Issues

**Issue**: "Cannot find module" errors
**Solution**: Run `pnpm install` to ensure all dependencies are present

**Issue**: Tests timing out
**Solution**: Check for infinite loops or slow file operations

**Issue**: Inconsistent results
**Solution**: Ensure tests don't depend on external state or network

## Future Improvements

Potential enhancements for the test suite:

- [ ] Add performance tests for page load times
- [ ] Validate external link availability (with caching)
- [ ] Check for broken anchor links within pages
- [ ] Validate image file sizes (optimization)
- [ ] Spell checking for common typos
- [ ] Validate code example syntax
- [ ] Check for consistent terminology
- [ ] Validate table formatting
- [ ] Check for proper link text (avoid "click here")

## Contributing

When adding new documentation:

1. Run `pnpm test` before committing
2. Fix any test failures
3. Address warnings when possible
4. Run `pnpm fix:format` to fix formatting issues
5. Tests will run again in CI on your PR

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
