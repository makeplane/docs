# AGENTS.md — developers.plane.so (`apps/developer-docs`)

The **Plane developer documentation site** built with VitePress: REST API reference, self-hosting guides and
developer tools documentation for the Plane project management platform. Live site:
https://developers.plane.so. Repo-wide rules (workspace, theme, formatting, branches) are in the root
`AGENTS.md`; this file covers this app only. `CLAUDE.md` is a symlink to this file.

## Commands

```bash
pnpm dev:developer-docs                   # from the repo root → http://localhost:5174
pnpm --filter developer-docs build        # or: cd apps/developer-docs && pnpm build → docs/.vitepress/dist
pnpm --filter developer-docs preview      # → http://localhost:4174
pnpm --filter developer-docs check:types
```

## Architecture

- **`docs/`** — All documentation content and VitePress config
  - **`docs/.vitepress/config.mts`** — Main VitePress config: navigation, sidebar structure, SEO, Algolia search,
    analytics. This is a large file that defines the entire site structure.
  - **`docs/.vitepress/theme/`** — `index.ts` calls `createPlaneTheme({...})` from `@plane/docs-theme` with this
    site's branding, registers the API components and toggles `.api-page` on API reference routes; `site.css`
    holds site-only CSS (home hero); `components/` holds `ApiParam`, `CodePanel`, `ResponsePanel`.
  - **`docs/public/`** — images (`images/`), fonts, logos, `robots.txt`
  - **`docs/api-reference/`** — REST API endpoint docs (180+ endpoints across 30+ resource categories)
  - **`docs/self-hosting/`** — Deployment and configuration guides
  - **`docs/dev-tools/`** — Webhooks, OAuth apps, agents, MCP server docs
  - **`docs/not-found.md`** — "Page not found" page; `buildEnd` turns it into the `404.html` Vercel serves (content is the shared `NotFound` theme component)
- **`vercel.json`** — cleanUrls, headers, redirects (per-app Vercel project)
- **`middleware.ts`** — Vercel Routing Middleware: `Accept: text/markdown` → `/path.md` with `Vary: Accept` (mirror of `apps/docs/middleware.ts`)
- Shared visual identity (header, layout, tokens, `Card`/`CardGroup`/`Tags`, Copy page menu, cookie consent)
  lives in `packages/theme` — never fork it here.

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

## Key documentation paths

- `self-hosting/methods/kubernetes.md` — K8s deployment guide
- `self-hosting/methods/install-methods-commercial/` — Commercial Docker Compose and Kubernetes
- `self-hosting/govern/integrations/` — GitHub, GitLab, Slack, Sentry
- `self-hosting/govern/plane-ai/` — AI features configuration (`configure-plane-ai.md`,
  `configure-embedding-model.md`, `aws-opensearch-embedding.md`)
- `self-hosting/govern/environment-variables.md` — All env var reference
- `self-hosting/govern/authentication.md` — Auth setup (LDAP, OIDC, SAML, OAuth)
- `self-hosting/govern/reverse-proxy.md` — Reverse proxy setup
- `self-hosting/manage/` — Instance management, backup/restore, Prime CLI
- `dev-tools/agents/` — Agent development docs
- `dev-tools/mcp-server.md` and `mcp-server-claude-code.md` — MCP server docs

## Custom Vue components

Used directly in markdown files — API components in `docs/.vitepress/theme/components/`, shared ones come
from `@plane/docs-theme` (`packages/theme/src/components/`):

| Component              | Usage                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `<ApiParam>`           | API parameter with name, type, required badge, expandable details                                    |
| `<CodePanel>`          | Multi-language code tabs (cURL, Python, JavaScript)                                                  |
| `<ResponsePanel>`      | Syntax-highlighted API response JSON                                                                 |
| `<Card>`               | Card: `title`, `icon` (brand key or Lucide), `href`/`link`, `description` or slot, `cta`/`link-text` |
| `<CardGroup cols="N">` | Responsive grid layout (2, 3, or 4 columns)                                                          |

## API documentation pattern

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

Each endpoint page: one file per endpoint, includes path/body params, OAuth scopes, and code examples in
cURL/Python/JavaScript.

## Conventions

- **Frontmatter**: Every markdown page needs `title`, `description`, and `keywords` fields
- **Images**: Stored in `docs/public/images/`, referenced with absolute paths (`/images/...`)
- **Links**: relative between pages of this site (no `.md`); full `https://docs.plane.so/...` URLs to the
  product docs
- **Sidebar updates**: When adding new pages, update the sidebar config in `docs/.vitepress/config.mts`
- **Formatting**: repo-wide oxfmt (`pnpm fix:format` at the root)
- **Diagrams**: Mermaid is enabled for this app only (`vitepress-plugin-mermaid`)

## Important notes

- Not all features are documented immediately after release
- API reference covers 30+ resource categories — check `docs/api-reference/` for the full list
- `self-hosting/govern/plane-ai/` is the correct location for AI configuration (the former
  `self-hosting/govern/plane-ai.md` was split into a directory)
