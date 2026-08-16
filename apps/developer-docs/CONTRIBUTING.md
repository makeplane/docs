# Contributing to Plane Developer Documentation

Thank you for your interest in contributing to Plane's developer documentation. This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm package manager

### Local Setup

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/makeplane/developer-docs.git
   cd developer-docs
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open `http://localhost:5173` in your browser

## Documentation Structure

### Content Directories

| Directory             | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `docs/api-reference/` | REST API endpoint documentation            |
| `docs/self-hosting/`  | Deployment and configuration guides        |
| `docs/dev-tools/`     | Developer tools, webhooks, and extensions  |
| `docs/plane-one/`     | Plane One (licensed edition) documentation |

### Configuration Files

| File                                        | Purpose                                   |
| ------------------------------------------- | ----------------------------------------- |
| `docs/.vitepress/config.mts`                | Navigation, sidebar, and site settings    |
| `docs/.vitepress/theme/styles.css`          | Global CSS styles (VoidZero/Vitest theme) |
| `docs/.vitepress/theme/plane-overrides.css` | Plane-specific CSS overrides              |
| `docs/.vitepress/theme/components/`         | Custom Vue components                     |

## Writing Documentation

### File Format

All documentation is written in Markdown with VitePress extensions.

### Frontmatter

Each page should include frontmatter:

```yaml
---
title: Page Title
description: Brief description for SEO
---
```

### Custom Components

The documentation includes custom Vue components for enhanced formatting:

- `<Card>` - Feature highlight cards
- `<CardGroup>` - Grouped card layouts
- `<ApiParam>` - API parameter documentation
- `<CodePanel>` - Code examples with syntax highlighting
- `<ResponsePanel>` - API response examples

### Images

Place images in `docs/.vitepress/public/images/` and reference them with absolute paths:

```markdown
![Alt text](/images/category/image-name.png)
```

## Making Changes

### Branch Naming

Use descriptive branch names:

- `docs/add-webhook-guide`
- `fix/typo-in-api-reference`
- `update/kubernetes-deployment`

### Commit Messages

Write clear, concise commit messages:

- `Add webhook payload examples`
- `Fix broken link in self-hosting guide`
- `Update Docker Compose instructions for v1.0`

### Pull Requests

1. Create a branch from `master`
2. Make your changes
3. Test locally with `pnpm dev`
4. Build and verify with `pnpm build && pnpm preview`
5. Submit a pull request to the `master` branch

### PR Guidelines

- Provide a clear description of changes
- Link related issues if applicable
- Ensure the build passes
- Request review from maintainers

## Style Guide

### Writing Style

- Use clear, concise language
- Write in second person ("you" instead of "we")
- Use active voice
- Include code examples where helpful

### Code Examples

- Provide working, tested examples
- Include necessary context and imports
- Use syntax highlighting with language identifiers

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/",
    headers={"X-API-Key": "your-api-key"}
)
```

### API Documentation

When documenting API endpoints:

- Include the HTTP method and path
- List all parameters with types and descriptions
- Show request and response examples
- Note any authentication requirements

## Reporting Issues

Found an error or have a suggestion? [Open an issue](https://github.com/makeplane/developer-docs/issues/new) with:

- Clear description of the problem or suggestion
- Link to the affected page
- Screenshots if applicable

## Questions

For questions about contributing, reach out on [Discord](https://discord.com/invite/A92xrEGCge) or open a discussion on GitHub.

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.
