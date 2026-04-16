# AGENTS.md — Plane Documentation

## Project overview

This is the [Plane](https://plane.so) product documentation site, built with [VitePress v1.6.3](https://vitepress.dev/) and hosted at [docs.plane.so](https://docs.plane.so). All content lives in the `docs/` directory as Markdown files.

## Stack

| Tool            | Version/Notes   |
| --------------- | --------------- |
| Framework       | VitePress 1.6.3 |
| Package manager | pnpm 10         |
| Node            | >=24.0.0        |
| Formatting      | oxfmt           |
| Styling         | Tailwind CSS v4 |

## Common commands

```bash
pnpm dev            # Start local dev server (http://localhost:5173)
pnpm build          # Build static output into docs/.vitepress/dist
pnpm preview        # Preview the production build locally
pnpm fix:format     # Auto-format all files with oxfmt
pnpm check:format   # Check formatting without writing
```

## Repo structure

```text
docs/                          # All content and VitePress config
  .vitepress/
    config.ts                  # VitePress config — nav, sidebar, search, head tags
    theme/                     # Custom theme overrides
  index.md                     # Home page (hero layout)
  introduction/                # Quickstart, tutorials, core-concepts overview
  core-concepts/               # Issues, projects, workspaces, pages, cycles, modules
  integrations/                # GitHub, GitLab, Slack, Sentry, draw.io
  importers/                   # Jira, Asana, Linear, ClickUp, CSV, Notion
  authentication/              # SSO, group sync
  automations/                 # Custom automations
  workflows-and-approvals/     # Workflows
  workspaces-and-users/        # Billing, seats, licenses, navigation
  ai/                          # Plane AI features
  support/                     # Keyboard shortcuts, get help
  templates/                   # Page, project, work-item templates
CONTRIBUTING.md
README.md
package.json
```

## Content conventions

- All content files are Markdown (`.md`). Use GitHub-flavored Markdown.

- Each file should have a front matter block at minimum with `title`:

  ```yaml
  ---
  title: Page Title
  description: One-sentence summary (used for SEO meta and og:description)
  ---
  ```

- Page headings (`#`) must match the sidebar label defined in `docs/.vitepress/config.ts`. When renaming a page, update both the file heading and the sidebar entry.

- Use relative links between docs (e.g., `[Cycles](/core-concepts/cycles)`). Do not use `.md` extensions in links.

- Images are hosted externally at `https://media.docs.plane.so/`. Do not commit binary assets. Reference them directly in Markdown.

- Use the `tabs` plugin (`vitepress-plugin-tabs`) for multi-tab code blocks where appropriate.

## Navigation and sidebar

The sidebar and top nav are configured entirely in `docs/.vitepress/config.ts`. When you add a new page:

1. Create the `.md` file in the appropriate `docs/` subdirectory.
2. Add an entry to the relevant sidebar section in `config.ts`.
3. If it needs a top-nav link, add it to `themeConfig.nav`.

## Formatting

Run `pnpm fix:format` before committing. CI checks formatting via `pnpm check:format`. Never skip this step.

## Branches and PRs

- Default/main branch: `master`
- Active development and review happens on the `preview` branch — open PRs targeting `preview`, not `master`.
- Branch naming: use short descriptive slugs (e.g., `fix/csv-importer-typo`, `docs/add-milestones-page`).
- Commit messages: `<type>: short description` — link to an issue where applicable (e.g., `docs: add recurring work items page (#412)`).

## What NOT to do

- Do not commit image or font binaries. Use the external CDN.
- Do not modify `pnpm-lock.yaml` manually — let pnpm manage it.
- Do not edit generated files in `docs/.vitepress/dist/`.
- Do not add analytics keys, API keys, or secrets to any file. Use environment variables (`.env` locally, platform env vars in CI).
- Do not rewrite VitePress config structure without understanding the existing sidebar/nav shape — the sidebar is hand-curated and order matters.
