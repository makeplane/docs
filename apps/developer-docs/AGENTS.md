# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Cursor, etc.) working in this repository. `CLAUDE.md` is a symlink to this file, so both resolve to the same content.

## Project Overview

This is the **Plane developer documentation site** built with **VitePress** (Vue 3-based static site generator). It covers REST API reference, self-hosting guides, and developer tools documentation for the Plane project management platform.

Live site: https://developers.plane.so

## Commands

```bash
pnpm install              # Install dependencies (use --frozen-lockfile in CI)
pnpm dev                  # Start dev server at http://localhost:5173
pnpm build                # Production build
pnpm preview              # Preview production build
pnpm check:format         # Check Prettier formatting
pnpm fix:format           # Auto-fix Prettier formatting
pnpm check:types          # Type-check the VitePress config and theme
pnpm check:theme-sync     # Verify docs/.vitepress/theme/plane/ is identical to makeplane/docs (THEME_SIBLING_PATH=../docs for a local checkout)
```

**CI checks on PRs** (to `master`): Prettier formatting + VitePress build must pass.

## Architecture

- **`docs/`** — All documentation content and VitePress config
  - **`docs/.vitepress/config.mts`** — Main VitePress config: navigation, sidebar structure, SEO, Algolia search, analytics. This is a large file that defines the entire site structure.
  - **`docs/.vitepress/theme/`** — `index.ts` calls `createPlaneTheme({...})` from `./plane` (this site's branding + API components); `site.css` holds site-only CSS
  - **`docs/.vitepress/theme/plane/`** — **shared Plane docs theme**, byte-identical with `makeplane/docs` (tokens, fonts, header, layout, Card/CardGroup/Tags, Copy page menu, cookie consent). Edit in one repo, copy the folder to the sibling, run `pnpm check:theme-sync` in both; add new files to `plane/manifest.json`. Header buttons come from `themeConfig.nav` items flagged `planeButton: "primary" | "secondary"`.
  - **`docs/api-reference/`** — REST API endpoint docs (180+ endpoints across 30+ resource categories)
  - **`docs/self-hosting/`** — Deployment and configuration guides
  - **`docs/dev-tools/`** — Webhooks, OAuth apps, agents, MCP server docs

### Directory structure

```text
docs/
  api-reference/        # REST API docs — 30+ resource categories (issues, cycles, modules, pages, etc.)
  dev-tools/            # Developer tooling guides
    agents/             # Agent development (overview, building, signals, best practices)
    build-plane-app/    # App development guide
    mcp-server.md       # MCP server setup
    mcp-server-claude-code.md  # MCP server with Claude Code
    plane-compose.md    # Plane Compose reference
    openapi-specification.md
    intro-webhooks.md
  self-hosting/         # Deployment and configuration guides
    methods/            # Docker, Kubernetes, Podman, Coolify, Portainer, one-click, airgapped
      install-methods-commercial/  # Commercial Docker Compose and Kubernetes
    govern/             # Auth, integrations, settings, SSL, DNS, env vars
      integrations/     # GitHub, GitLab, Slack, Sentry
      plane-ai/         # AI features configuration (configure-plane-ai, embedding models)
    manage/             # Backup/restore, Prime CLI, update Plane, logs, user management
    troubleshoot/       # CLI errors, installation, license, storage errors
```

## Key Documentation Paths

- `self-hosting/methods/kubernetes.md` — K8s deployment guide
- `self-hosting/methods/install-methods-commercial/` — Commercial Docker Compose and Kubernetes
- `self-hosting/govern/integrations/` — GitHub, GitLab, Slack, Sentry
- `self-hosting/govern/plane-ai/` — AI features configuration (`configure-plane-ai.md`, `configure-embedding-model.md`, `aws-opensearch-embedding.md`)
- `self-hosting/govern/environment-variables.md` — All env var reference
- `self-hosting/govern/authentication.md` — Auth setup (LDAP, OIDC, SAML, OAuth)
- `self-hosting/govern/reverse-proxy.md` — Reverse proxy setup
- `self-hosting/manage/` — Instance management, backup/restore, Prime CLI
- `dev-tools/agents/` — Agent development docs
- `dev-tools/mcp-server.md` and `mcp-server-claude-code.md` — MCP server docs

## Custom Vue Components

Used directly in markdown files — API components in `docs/.vitepress/theme/components/`, shared ones in `docs/.vitepress/theme/plane/components/`:

| Component              | Usage                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `<ApiParam>`           | API parameter with name, type, required badge, expandable details                                    |
| `<CodePanel>`          | Multi-language code tabs (cURL, Python, JavaScript)                                                  |
| `<ResponsePanel>`      | Syntax-highlighted API response JSON                                                                 |
| `<Card>`               | Card: `title`, `icon` (brand key or Lucide), `href`/`link`, `description` or slot, `cta`/`link-text` |
| `<CardGroup cols="N">` | Responsive grid layout (2, 3, or 4 columns)                                                          |

## API Documentation Pattern

API endpoint pages follow a strict two-column layout pattern:

```markdown
<div class="api-two-column">
<div class="api-left">
  <!-- Parameters using <ApiParam> -->
</div>
<div class="api-right">
  <!-- Code examples using <CodePanel> + <ResponsePanel> -->
</div>
</div>
```

Each endpoint page: one file per endpoint, includes path/body params, OAuth scopes, and code examples in cURL/Python/JavaScript.

## Conventions

- **Frontmatter**: Every markdown page needs `title`, `description`, and `keywords` fields
- **Images**: Stored in `docs/.vitepress/public/images/`, referenced with absolute paths (`/images/...`)
- **Branch workflow**: Branch from `master`, use `fix/`, `feat/`, `docs/`, `update/` prefixes
- **Formatting**: Prettier enforced — 120 char width, 2-space indent, semicolons, double quotes, ES5 trailing commas
- **Sidebar updates**: When adding new pages, update the sidebar config in `docs/.vitepress/config.mts`

## Important Notes

- Not all features are documented immediately after release
- API reference covers 30+ resource categories — check `docs/api-reference/` for the full list
- `self-hosting/govern/plane-ai/` is the correct location for AI configuration (the former `self-hosting/govern/plane-ai.md` was split into a directory)
