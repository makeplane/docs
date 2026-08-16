# AGENTS.md — Plane Documentation

## Project overview

This is the [Plane](https://plane.so) product documentation site, built with [VitePress](https://vitepress.dev/) (version in the table below) and hosted at [docs.plane.so](https://docs.plane.so). All content lives in the `docs/` directory as Markdown files.

## Stack

| Tool            | Version/Notes                                                       |
| --------------- | ------------------------------------------------------------------- |
| Framework       | VitePress 2.0.0-alpha.16 (pinned; same as makeplane/developer-docs) |
| Package manager | pnpm 11.8.0                                                         |
| Node            | >=24.0.0                                                            |
| Formatting      | oxfmt                                                               |
| Styling         | Tailwind CSS v4                                                     |

## Common commands

```bash
pnpm dev            # Start local dev server (http://localhost:5173)
pnpm build          # Build static output into docs/.vitepress/dist
pnpm preview        # Preview the production build locally
pnpm fix:format     # Auto-format all files with oxfmt
pnpm check:format   # Check formatting without writing
pnpm check:types    # Type-check the VitePress config and theme
pnpm check:theme-sync  # Verify docs/.vitepress/theme/plane/ is identical to makeplane/developer-docs (THEME_SIBLING_PATH=../developer-docs for a local checkout)
```

## Repo structure

```text
docs/                          # All content and VitePress config
  .vitepress/
    config.ts                  # VitePress config — nav, sidebar, search, head tags
    theme/
      index.ts                 # createPlaneTheme({ brand }) — this site's branding only
      site.css                 # site-specific CSS (keep tiny; shared styles go in plane/)
      plane/                   # SHARED THEME — byte-identical with makeplane/developer-docs (see below)
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

## Shared theme (`docs/.vitepress/theme/plane/`)

The visual identity (tokens, fonts, header, layout, `Card`/`CardGroup`/`Tags`, Copy page menu, cookie
consent) lives in `docs/.vitepress/theme/plane/` and is **byte-identical** with the same folder in
`makeplane/developer-docs`. Rules:

- Edit shared files in one repo, copy the whole folder to the sibling repo, run `pnpm check:theme-sync`
  in both (CI runs it too). Add new files to `plane/manifest.json`.
- Site-specific things (logo URLs, extra components, nav) go through `createPlaneTheme(...)` options in
  `theme/index.ts` or into `theme/site.css` — never edit `plane/` for one site only.
- Header buttons come from `themeConfig.nav` items flagged `planeButton: "primary" | "secondary"`.

## Formatting

Run `pnpm fix:format` before committing. CI checks formatting via `pnpm check:format`. Never skip this step.

## Branches and PRs

- Default/main branch: `master`
- Open PRs targeting `master`.
- Branch naming: use short descriptive slugs (e.g., `fix/csv-importer-typo`, `docs/add-milestones-page`).
- Commit messages: `<type>: short description` — link to an issue where applicable (e.g., `docs: add recurring work items page (#412)`).

## What NOT to do

- Do not commit image or font binaries. Use the external CDN.
- Do not modify `pnpm-lock.yaml` manually — let pnpm manage it.
- Do not edit generated files in `docs/.vitepress/dist/`.
- Do not add analytics keys, API keys, or secrets to any file. Use environment variables (`.env` locally, platform env vars in CI).
- Do not rewrite VitePress config structure without understanding the existing sidebar/nav shape — the sidebar is hand-curated and order matters.
