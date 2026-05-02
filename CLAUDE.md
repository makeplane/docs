# CLAUDE.md — Plane Documentation

This file provides context for Claude and other AI coding assistants working on the Plane documentation repository.

## Project overview

This is the [Plane](https://plane.so) product documentation site, built with VitePress v1.6.3 and hosted at [docs.plane.so](https://docs.plane.so). All content is in Markdown format within the `docs/` directory.

## Tech stack

- **Framework**: VitePress 1.6.3
- **Package manager**: pnpm 10 (do not use npm or yarn)
- **Node version**: >=24.0.0
- **Formatting**: oxfmt (not Prettier)
- **Styling**: Tailwind CSS v4

## Essential commands

```bash
pnpm dev            # Start dev server at http://localhost:5173
pnpm build          # Build to docs/.vitepress/dist
pnpm preview        # Preview production build
pnpm fix:format     # Format all files with oxfmt
pnpm check:format   # Check formatting only
```

## Development workflow

1. **Branch strategy**: 
   - Main branch: `master`
   - Active development: `preview` branch
   - Always target PRs to `preview`, not `master`
   - Use descriptive branch names like `fix/typo-in-cycles`, `docs/add-workflows-page`

2. **Before committing**:
   - Run `pnpm fix:format` to auto-format all files
   - CI will fail if formatting is incorrect

3. **Commit messages**:
   - Use conventional commits: `<type>: short description`
   - Link to issues where applicable: `docs: add milestones page (#412)`

4. **Pull requests**:
   - Target the `preview` branch
   - Include work item identifier prefix if available: `[WEB-1234] docs: add feature page`
   - Check for PR templates in `.github/PULL_REQUEST_TEMPLATE.md` or similar

## Content guidelines

### Markdown files

- All docs are `.md` files in the `docs/` directory
- Use GitHub-flavored Markdown
- Every file needs front matter with at minimum a `title`:

```yaml
---
title: Page Title
description: One-sentence summary for SEO and og:description
---
```

### Links and references

- Use relative links: `[Cycles](/core-concepts/cycles)` — no `.md` extension
- Images are hosted at `https://media.docs.plane.so/` — do not commit binaries
- Use `vitepress-plugin-tabs` for multi-tab code blocks when appropriate

### Page structure

- Page headings (`#`) must match the sidebar label in `docs/.vitepress/config.ts`
- When renaming a page, update both the file heading and the sidebar config

### Navigation

The sidebar and top nav are entirely defined in `docs/.vitepress/config.ts`. When adding a new page:

1. Create the `.md` file in the appropriate `docs/` subdirectory
2. Add an entry to the relevant sidebar section in `config.ts`
3. Add to `themeConfig.nav` if it needs a top-nav link

## Directory structure

```
docs/
  .vitepress/
    config.ts           # VitePress config: nav, sidebar, search, head
    theme/              # Custom theme overrides
  index.md              # Home page (hero layout)
  introduction/         # Quickstart, tutorials, core-concepts overview
  core-concepts/        # Issues, projects, workspaces, pages, cycles, modules
  integrations/         # GitHub, GitLab, Slack, Sentry, draw.io
  importers/            # Jira, Asana, Linear, ClickUp, CSV, Notion
  authentication/       # SSO, group sync
  automations/          # Custom automations
  workflows-and-approvals/  # Workflows
  workspaces-and-users/     # Billing, seats, licenses, navigation
  ai/                   # Plane AI features
  support/              # Keyboard shortcuts, get help
  templates/            # Page, project, work-item templates
  work-items/           # Work item types, custom relations
  roles-and-permissions/    # Roles, permissions, schemes
  communication-and-collaboration/  # Comments, inbox, notifications
  intake/               # Intake forms and email
  pages/                # Report pages
  dashboards.md
  releases.md
  your-work.md
  customers.md
```

## Important constraints

### Do NOT

- Commit image, font, or other binary assets — use the CDN at `https://media.docs.plane.so/`
- Manually edit `pnpm-lock.yaml`
- Edit generated files in `docs/.vitepress/dist/`
- Add API keys, secrets, or analytics keys to any file — use environment variables
- Rewrite VitePress config without understanding the existing sidebar structure

### DO

- Preserve existing sidebar order in `config.ts` — it's hand-curated
- Use pnpm for all package operations
- Format code with `pnpm fix:format` before committing
- Follow the existing content structure and conventions
- Check that the dev server runs without errors after changes

## Testing changes

1. Run `pnpm dev` to start the local server
2. Navigate to affected pages in the browser
3. Check that links work and content renders correctly
4. Run `pnpm build` to ensure no build errors
5. Run `pnpm check:format` to verify formatting

## Getting help

- Plane Forum: [forum.plane.so](https://forum.plane.so)
- For questions about VitePress, see [vitepress.dev](https://vitepress.dev/)
