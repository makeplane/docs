# Plane Documentation

This website is built using [VitePress v1.6.3](https://vitepress.dev/) and hosted at [docs.plane.so](https://docs.plane.so/). If you are looking for the developer documentation, see [Plane developer documentation](https://github.com/makeplane/developer-docs).

## Overview

The Plane documentation provides detailed information on the following topics:

- Understanding the different components of Plane.
- Establishing connections between Plane and other applications.

## Installation

1. Clone the repository.

   ```bash
   git clone git@github.com:makeplane/docs.git
   ```

2. Navigate to the project directory.

   ```bash
   cd docs
   ```

3. Install dependencies.
   ```bash
   pnpm install
   ```

## Local development

```bash
pnpm dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
pnpm build
```

This command generates static files into the `docs/.vitepress/dist` directory.

## Testing

The project includes a comprehensive test suite to ensure documentation quality and consistency.

### Run tests

```bash
pnpm test
```

### Run tests in watch mode

```bash
pnpm test:watch
```

### Run tests with UI

```bash
pnpm test:ui
```

### Run tests with coverage

```bash
pnpm test:coverage
```

### Test suites

The test suite includes the following validations:

1. **Link Validation** (`tests/links.test.ts`)
   - Validates all internal links point to existing files
   - Checks that links don't use `.md` extensions
   - Ensures external links use HTTPS

2. **Front Matter Validation** (`tests/frontmatter.test.ts`)
   - Ensures all pages have required front matter (title, description)
   - Validates front matter content quality (length, format)
   - Checks for consistent YAML formatting

3. **Content Validation** (`tests/content.test.ts`)
   - Validates heading hierarchy and structure
   - Checks for empty content or TODO comments
   - Ensures images use the external CDN
   - Validates image alt text
   - Checks for trailing whitespace

4. **Configuration Validation** (`tests/config.test.ts`)
   - Validates VitePress configuration structure
   - Ensures sidebar links point to existing files
   - Checks for required theme and site metadata

## Contributing

Interested in helping us improve the documentation? We’d love your contributions! Whether you're fixing a typo, adding a new guide, or improving an existing page, every bit helps.

To get started, check out our [Contribution Guide](/CONTRIBUTING.md). We welcome contributions related to core product features or integrations with other tools.
