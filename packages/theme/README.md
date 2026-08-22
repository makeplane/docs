# `@plane/docs-theme` — shared Plane docs theme

The visual identity of [docs.plane.so](https://docs.plane.so) (`apps/docs`) and
[developers.plane.so](https://developers.plane.so) (`apps/developer-docs`): design tokens, fonts,
`PlaneHeader`, the doc layout, `Card` / `CardGroup` / `Tags`, the Copy page menu and the cookie-consent
banner — all built on top of `@voidzero-dev/vitepress-theme`.

It is a workspace package consumed **as source** (`exports` point at `src/index.ts`; VitePress/Vite compile
the `.ts` / `.vue` / `.css` directly, so there is no build step and no publish).

## Using it in an app

```ts
// apps/<app>/docs/.vitepress/theme/index.ts
import { createPlaneTheme } from "@plane/docs-theme";
import "./site.css"; // site-specific rules only

export default createPlaneTheme({
  brand: { logoOnLight, logoOnDark, logoAlt, menuTitle, footerBg, monoIcon },
  components: {
    /* extra globally-registered components */
  },
  setup() {
    /* extra client setup */
  },
});
```

- Header buttons come from `themeConfig.nav` items flagged `planeButton: "primary" | "secondary"`.
- `src/index.ts` is the only place that imports `src/css/index.css` (the Tailwind root). Never import the
  theme CSS from an app.
- Anything site-specific — logos, analytics, API-reference components, `site.css` — belongs in the app, not
  here.

## Developing

Edit files under `src/` and run either app's dev server (`pnpm dev:docs` / `pnpm dev:developer-docs` from
the repo root); changes hot-reload through the workspace link. `pnpm check:types` type-checks the package
(and each app re-checks it as part of its own program). Formatting is the repo-wide `oxfmt` (`pnpm fix:format`).

## Layout

```
src/
  index.ts        createPlaneTheme(options) + client setup (appearance sync, medium-zoom, tab hashes)
  options.ts      PlaneThemeOptions / planeOptionsKey
  seo.ts          build-time helpers for the VitePress configs (`@plane/docs-theme/seo`): Organization/WebSite JSON-LD, canonical link
  layout/         Layout.vue, doc-layout.vue (PlaneHeader + bordered content wrapper), slots/header helpers
  components/     PlaneHeader, CopyPageMenu, CookieConsent, Card, CardGroup, Tags, brand icons
  css/            index.css → fonts, tokens, base, layout, components, api
  types/          ambient shims (*.vue, @vp-* aliases) and the VitePress config augmentation
```
