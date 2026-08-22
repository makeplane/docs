# AGENTS.md — Plane documentation monorepo

Guidance for AI coding agents (Claude Code, Codex, Cursor, …) working in this repository. `CLAUDE.md` is a
symlink to this file. Each app has its own `AGENTS.md` with content conventions — **read the app's file before
editing content there** (`apps/docs/AGENTS.md`, `apps/developer-docs/AGENTS.md`).

## What this repo is

pnpm workspace + Turborepo holding both Plane documentation sites and their shared theme:

| Package             | Path                  | What                                                                                                                                            |
| ------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs`              | `apps/docs`           | [docs.plane.so](https://docs.plane.so) — product documentation                                                                                  |
| `developer-docs`    | `apps/developer-docs` | [developers.plane.so](https://developers.plane.so) — API reference, self-hosting, dev tools                                                     |
| `@plane/docs-theme` | `packages/theme`      | Shared VitePress theme (tokens, fonts, header, layout, Card/CardGroup/Tags, Copy page menu, cookie consent) — consumed as source, no build step |

## Stack

| Tool            | Version / notes                                                              |
| --------------- | ---------------------------------------------------------------------------- |
| Framework       | VitePress 2.0.0-alpha.16 (pinned in the `catalog:` of `pnpm-workspace.yaml`) |
| Base theme      | `@voidzero-dev/vitepress-theme` 4.8.x (brings Tailwind CSS v4)               |
| Package manager | pnpm 11.8.0 (`packageManager` in root `package.json`)                        |
| Node            | >=24.0.0                                                                     |
| Task runner     | Turborepo 2.x (`turbo.json`)                                                 |
| Formatting      | oxfmt (root `.oxfmtrc.json`, defaults: printWidth 100, trailing commas)      |
| Type-checking   | `tsc` per package, all extending root `tsconfig.base.json`                   |

## Common commands (run from the repo root)

```bash
pnpm install                 # one lockfile for the whole workspace
pnpm dev:docs                # docs.plane.so dev server        → http://localhost:5173
pnpm dev:developer-docs      # developers.plane.so dev server  → http://localhost:5174
pnpm dev                     # both, interleaved log output
pnpm build                   # turbo run build (apps/<app>/docs/.vitepress/dist)
pnpm preview                 # turbo run preview (:4173 / :4174)
pnpm check:types             # turbo run check:types (theme + both apps)
pnpm check:format            # oxfmt --check .
pnpm fix:format              # oxfmt --write .
pnpm check                   # check:format + check:types
pnpm --filter docs <script>  # run a script in one package (or cd into the app)
```

Turbo runs tasks with `cwd` = the package directory, so per-app `.env` files live at `apps/<app>/.env`
(templates: `apps/<app>/.env.example`).

## Repo structure

```text
apps/
  docs/                        # docs.plane.so — see apps/docs/AGENTS.md
    docs/                      #   content (*.md) + .vitepress/{config.ts, theme/index.ts, theme/site.css}
    package.json vercel.json tsconfig.json .env.example
  developer-docs/              # developers.plane.so — see apps/developer-docs/AGENTS.md
    docs/                      #   content + public/ (images, fonts, logos) + .vitepress/{config.mts, theme/…}
    package.json vercel.json tsconfig.json .env.example
packages/
  theme/                       # @plane/docs-theme — see packages/theme/README.md
    src/{index.ts, options.ts, components/, layout/, css/, types/}
turbo.json                     # tasks: build, dev, preview, check:types
pnpm-workspace.yaml            # workspace packages, dependency catalog, overrides, allowBuilds
tsconfig.base.json             # shared compilerOptions + @vp-* path aliases (${configDir}-relative)
.oxfmtrc.json .gitignore .github/workflows/ci.yml
```

## Rules of the monorepo

- **Theme changes go in `packages/theme`** — both sites pick them up. Never fork a shared component or CSS
  rule into one app; site-specific bits go through `createPlaneTheme({ brand, components, setup })` options in
  `apps/<app>/docs/.vitepress/theme/index.ts` or into that app's `site.css`.
- `packages/theme/src/index.ts` is the only importer of the theme CSS (Tailwind root). Do not import
  `@plane/docs-theme`'s CSS from an app.
- Shared dependency versions live in the `catalog:` in `pnpm-workspace.yaml`; apps and the theme reference
  them as `"catalog:"`. Add new shared deps there. There must be exactly one copy of `vue`, `vitepress` and
  `@voidzero-dev/vitepress-theme` (`pnpm dedupe --check` runs in CI).
- One `pnpm-lock.yaml` at the root; never edit it by hand.
- Each app keeps its own `vercel.json` (redirects, headers) and `middleware.ts` (Vercel Routing Middleware for
  `Accept: text/markdown` negotiation; the two copies must stay identical) — Vercel projects
  point at `apps/docs` and `apps/developer-docs` as Root Directory.
- Header buttons come from `themeConfig.nav` items flagged `planeButton: "primary" | "secondary"`.

## Formatting

Run `pnpm fix:format` before committing. CI checks formatting via `pnpm check:format`. Never skip this step.

## Branches and PRs

- Default branch: `master`. Open PRs against `master`.
- Branch naming: short descriptive slugs (`fix/csv-importer-typo`, `docs/add-milestones-page`,
  `theme/card-hover`).
- Commit messages: `<type>(<scope>): short description` — scope is optional (`docs`, `developer-docs`,
  `theme`); link an issue where applicable (`docs: add recurring work items page (#412)`).
- CI (`.github/workflows/ci.yml`): oxfmt check; `pnpm dedupe --check`; `turbo run check:types build`.

## History note

`apps/developer-docs` was imported from the former `makeplane/developer-docs` repository with full history
(rename commit + merge). Use `git log --follow <path>`; add `--first-parent` to stay on the docs.plane.so
lineage for paths that existed in both repos (e.g. `docs/index.md`).

## What NOT to do

- Do not commit new image or font binaries to `apps/docs` (CDN only). `apps/developer-docs/docs/public/`
  holds its images/logos.
- Do not modify `pnpm-lock.yaml` manually — let pnpm manage it.
- Do not edit generated files in `**/.vitepress/dist/`.
- Do not add analytics keys, API keys, or secrets to any file. Use environment variables (`apps/<app>/.env`
  locally, platform env vars in CI/Vercel).
- Do not rewrite VitePress config structure without understanding the existing sidebar/nav shape — the
  sidebars are hand-curated and order matters.
