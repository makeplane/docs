# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Plane product documentation site** ([docs.plane.so](https://docs.plane.so)), built with VitePress. It was recently migrated from Docusaurus — the old `sidebars.ts` is a legacy artifact and is no longer used.

## Commands

```bash
pnpm dev              # Start local dev server
pnpm build            # Production build (outputs to docs/.vitepress/dist/)
pnpm preview          # Preview production build locally
pnpm format           # Format all files with oxfmt
pnpm format:check     # Validate formatting (runs in CI)
```

## Architecture

### Directory Layout

- `docs/` — all documentation content as Markdown files
- `docs/.vitepress/config.mts` — main VitePress config: sidebar navigation, head tags, analytics, theme settings
- `docs/.vitepress/theme/` — custom theme layer extending VitePress default theme
- `docs/.vitepress/theme/index.ts` — theme entry: registers custom components and tabs plugin
- `docs/.vitepress/theme/style.css` — global CSS (Tailwind v4, custom properties, component styles)
- `docs/.vitepress/theme/components/` — custom Vue components used in Markdown
- `docs/public/` — static assets (fonts, logos)
- `vercel.json` — 200+ URL redirects for backward compatibility with old Docusaurus paths
- `sidebars.ts` — **legacy file from Docusaurus migration, not used by VitePress**

### Sidebar Navigation

The sidebar is defined entirely in `docs/.vitepress/config.mts` under `themeConfig.sidebar`. When adding or reorganizing pages, edit this array directly.

### Custom Vue Components

These are globally registered and can be used directly in any Markdown file:

- **`<Card>`** — content card with optional icon and link. Has built-in SVG icons for GitHub, Slack, GitLab, Sentry, Linear, Asana, Jira, CSV.
- **`<CardGroup>`** — responsive grid wrapper. Prop: `cols` (default 2).
- **`<Tags>`** — pricing tier badges (Pro, Business, Enterprise). Accepts `:tags` array with `name`, `link`, and `additionalClass` (`pro`, `business`, `enterprise`).

### Markdown Conventions

```markdown
<!-- Pricing tags -->
<Tags :tags='[{ name: "Pro", link: "/url", additionalClass: "pro" }]' />

<!-- Card groups -->
<CardGroup :cols="2">
  <Card title="Title" icon="github" href="/path">
    Description
  </Card>
</CardGroup>

<!-- Admonitions -->
::: tip
::: warning
::: danger

<!-- Tabs (via vitepress-plugin-tabs) -->
:::tabs
== Tab 1
Content
== Tab 2
Content
:::

<!-- Image styling via hash fragments -->
![Alt](https://url#hero)       <!-- rounded corners + shadow -->
![Alt](https://url#hero-tl)    <!-- top-left corner only -->
```

### Image Hosting

All documentation images are hosted externally at `https://media.docs.plane.so/`. Reference them by full URL in Markdown.

## CI

GitHub Actions (`.github/workflows/build.yml`) runs two jobs on PRs and pushes to `master`:
1. **format** — `pnpm format:check`
2. **build** — `pnpm build`

## Formatting

Uses oxfmt (`.oxfmtrc.json`): 120 char width, 2-space indent, ES5 trailing commas.
