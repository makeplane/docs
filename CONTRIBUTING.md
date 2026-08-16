# Contributing to Plane documentation

Thank you for your interest in contributing to Plane's documentation! This repository holds both
[docs.plane.so](https://docs.plane.so) (`apps/docs`) and [developers.plane.so](https://developers.plane.so)
(`apps/developer-docs`).

## Report issues

1. **Check existing issues** — verify a similar issue does not already exist.
2. **Create an issue** — describe the problem or enhancement with as much detail as possible and link to the
   affected page.

## Set up your environment

See the [README](/README.md): `pnpm install`, then `pnpm dev:docs` or `pnpm dev:developer-docs`. Node.js 24+ and
pnpm 11 are required.

## Where things live

| You want to change…                             | Edit                                                     |
| ----------------------------------------------- | -------------------------------------------------------- |
| A docs.plane.so page                            | `apps/docs/docs/**/*.md`                                 |
| The docs.plane.so sidebar / nav                 | `apps/docs/docs/.vitepress/config.ts`                    |
| A developers.plane.so page (API, self-hosting…) | `apps/developer-docs/docs/**/*.md`                       |
| The developers.plane.so sidebar / nav           | `apps/developer-docs/docs/.vitepress/config.mts`         |
| Something visual shared by both sites           | `packages/theme/src/**` (see `packages/theme/README.md`) |
| Site-only styling or components                 | `apps/<app>/docs/.vitepress/theme/`                      |

Each app has an `AGENTS.md` with its content conventions (frontmatter, links, images, components) — read it
before editing content there.

## Writing guidelines

- Markdown with VitePress extensions; every page has front matter with at least `title` and `description`
  (developer docs also use `keywords`).
- Clear, concise language; second person ("you"), active voice; code examples where helpful, with language
  identifiers.
- Relative links between pages of the same site (no `.md` extension). Cross-site links use the full URL.
- Images: docs.plane.so uses the CDN (`https://media.docs.plane.so/…`, no binaries in the repo);
  developers.plane.so keeps images in `apps/developer-docs/docs/public/images/` and references them as
  `/images/...`.
- API endpoint pages (developer docs) follow the two-column pattern described in
  `apps/developer-docs/AGENTS.md`: HTTP method + path, all parameters with types, request/response examples,
  auth requirements.

## Submit changes

1. Fork/clone `makeplane/docs` and create a branch from `master` (`docs/add-webhook-guide`,
   `fix/typo-in-api-reference`, …).
2. Make your changes and check them locally: `pnpm dev:<app>`, then `pnpm fix:format && pnpm check` and
   `pnpm build`.
3. Commit with a clear message that links the issue where applicable
   (`docs: add recurring work items page (#412)`).
4. Open a pull request against `master`. CI runs formatting, type-checks and both builds; Vercel posts preview
   links for the affected site(s).
5. Before we can merge, you must sign the Contributor License Agreement (CLA).

A member of the Plane team will review your PR; response times vary with our workload. Questions? Join the
[Plane Forum](https://forum.plane.so) or [Discord](https://discord.com/invite/A92xrEGCge).
