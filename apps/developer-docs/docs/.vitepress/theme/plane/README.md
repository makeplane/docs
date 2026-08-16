# Plane docs theme (shared)

This folder is **byte-identical** in [makeplane/docs](https://github.com/makeplane/docs) and
[makeplane/developer-docs](https://github.com/makeplane/developer-docs) — it is the single source of the
visual identity for docs.plane.so and developers.plane.so (tokens, fonts, header, layout, Card/CardGroup/Tags,
Copy page menu, cookie consent).

- Each site's `docs/.vitepress/theme/index.ts` is a thin `createPlaneTheme({ brand, … })` call; anything
  site-specific (logo URLs, extra components, `.api-page` toggling) is passed in as options or lives outside
  this folder.
- **Editing:** change files here in one repo, copy the whole folder to the sibling repo, and run
  `pnpm check:theme-sync` in both (locally: `THEME_SIBLING_PATH=../<sibling> pnpm check:theme-sync`).
  CI runs the same check against the sibling's `master` (or a same-named PR branch).
- **Formatting:** files here are formatted so that oxfmt (docs) and prettier (developer-docs, via the
  `.prettierrc` override for this folder) agree — keep `printWidth: 100`, `trailingComma: "all"`.
- Add new files to `manifest.json`.
