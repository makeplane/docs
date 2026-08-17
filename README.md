# Plane documentation

Monorepo for Plane's documentation sites, built with [VitePress](https://vitepress.dev/) and managed with
pnpm workspaces + [Turborepo](https://turborepo.dev/).

| Package             | Path                  | Site                                                                              |
| ------------------- | --------------------- | --------------------------------------------------------------------------------- |
| `docs`              | `apps/docs`           | [docs.plane.so](https://docs.plane.so) — product docs                             |
| `developer-docs`    | `apps/developer-docs` | [developers.plane.so](https://developers.plane.so) — API, self-hosting, dev tools |
| `@plane/docs-theme` | `packages/theme`      | Shared VitePress theme used by both sites                                         |

## Getting started

Requirements: Node.js 24+ and pnpm 11 (`corepack enable` picks up the pinned version).

```bash
git clone git@github.com:makeplane/docs.git
cd docs
pnpm install

pnpm dev:docs             # docs.plane.so        → http://localhost:5173
pnpm dev:developer-docs   # developers.plane.so  → http://localhost:5174
pnpm dev                  # both dev servers (interleaved logs)

pnpm build                # build every app (output: apps/<app>/docs/.vitepress/dist)
pnpm check                # oxfmt formatting + type-checks
pnpm fix:format           # auto-format
```

Each app also works on its own: `cd apps/docs && pnpm dev`. Copy `apps/<app>/.env.example` to
`apps/<app>/.env` to configure optional Algolia credentials; without them, search falls back to local search.

## Repository layout

```text
apps/
  docs/                 docs.plane.so — content in docs/, config in docs/.vitepress/config.ts
  developer-docs/       developers.plane.so — content in docs/, config in docs/.vitepress/config.mts
packages/
  theme/                @plane/docs-theme — tokens, fonts, header, layout, Card/CardGroup/Tags, Copy page menu
turbo.json              task pipeline (build / dev / preview / check:types)
pnpm-workspace.yaml     workspace packages, shared dependency catalog, pnpm overrides
```

Content changes go in the relevant `apps/<app>/docs/` folder; theme changes go in `packages/theme` and are
picked up by both sites automatically. Each app has its own `vercel.json` and `AGENTS.md`.

## History

`apps/developer-docs` was imported from the former
[makeplane/developer-docs](https://github.com/makeplane/developer-docs) repository with its full history.
Use `git log --follow <file>` to see a file's history across the move (add `--first-parent` to stay on the
docs.plane.so lineage when a path existed in both repositories).

## Contributing

Whether you're fixing a typo, adding a guide, or improving an existing page, contributions are welcome — see the
[Contribution Guide](/CONTRIBUTING.md).
