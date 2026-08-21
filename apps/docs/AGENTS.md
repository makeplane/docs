# AGENTS.md — docs.plane.so (`apps/docs`)

The [Plane](https://plane.so) product documentation site, built with VitePress and hosted at
[docs.plane.so](https://docs.plane.so). All content lives in `docs/` as Markdown. Repo-wide rules
(workspace, theme, formatting, branches) are in the root `AGENTS.md`; this file covers this app only.
`CLAUDE.md` is a symlink to this file.

## Commands

```bash
pnpm dev:docs                   # from the repo root → http://localhost:5173
pnpm --filter docs build        # or: cd apps/docs && pnpm build → docs/.vitepress/dist
pnpm --filter docs preview      # → http://localhost:4173
pnpm --filter docs check:types
```

## Structure

```text
docs/
  .vitepress/
    config.ts                  # VitePress config — nav, sidebar, search, head tags (analytics, consent)
    theme/
      index.ts                 # createPlaneTheme({ brand }) — this site's branding only
      site.css                 # site-specific CSS (keep tiny; shared styles live in packages/theme)
  public/                      # fonts/, icons/, robots.txt (no images — see below)
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
docs/not-found.md              # "Page not found" page → becomes 404.html in buildEnd (shared NotFound component)
vercel.json                    # cleanUrls, headers, redirects, Accept: text/markdown rewrite
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

- Page headings (`#`) must match the sidebar label defined in `docs/.vitepress/config.ts`. When renaming a
  page, update both the file heading and the sidebar entry.

- Use relative links between docs (e.g., `[Cycles](/core-concepts/cycles)`). Do not use `.md` extensions in
  links. Links to the developer docs use the full `https://developers.plane.so/...` URL.

- Images are hosted externally at `https://media.docs.plane.so/`. Do not commit binary assets. Reference them
  directly in Markdown.

- Use the `tabs` plugin (`vitepress-plugin-tabs`) for multi-tab code blocks where appropriate. Shared
  components available in Markdown: `<Card>`, `<CardGroup cols="N">`, `<Tags>` (from `@plane/docs-theme`).

## Navigation and sidebar

The sidebar and top nav are configured entirely in `docs/.vitepress/config.ts`. When you add a new page:

1. Create the `.md` file in the appropriate `docs/` subdirectory.
2. Add an entry to the relevant sidebar section in `config.ts`.
3. If it needs a top-nav link, add it to `themeConfig.nav` (header buttons are nav items flagged
   `planeButton: "primary" | "secondary"`).

## What NOT to do

- Do not commit image or font binaries. Use the external CDN.
- Do not edit generated files in `docs/.vitepress/dist/`.
- Do not add analytics keys, API keys, or secrets to any file (`.env` locally, platform env vars in CI).
- Do not rewrite the VitePress config structure without understanding the existing sidebar/nav shape — the
  sidebar is hand-curated and order matters.
