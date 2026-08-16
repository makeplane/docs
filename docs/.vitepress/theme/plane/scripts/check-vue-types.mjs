#!/usr/bin/env node
/**
 * check-vue-types — type-check the VitePress config and theme, SFCs included.
 *
 *   node docs/.vitepress/theme/plane/scripts/check-vue-types.mjs [tsconfig]
 *
 * Plain `tsc` cannot parse `.vue`, so it silently skips every component in the
 * `include` globs — `tsc --noEmit` stays green with an outright type error in an
 * SFC. `vue-tsc` reads them, but it also surfaces errors from the vendored
 * `@voidzero-dev/vitepress-theme` sources our components import (unlisted optional
 * peer deps, loose types), which we cannot fix from here and `skipLibCheck` does
 * not cover because they are `.vue`, not `.d.ts`.
 *
 * So: everything is type-checked, node_modules diagnostics are summarised as a
 * note, and only first-party files decide the exit code.
 *
 * Exit codes: 0 clean · 1 type errors in first-party files · 2 vue-tsc failed to run
 */
import { spawnSync } from "node:child_process";

const project = process.argv[2] ?? "docs/.vitepress/tsconfig.json";

const run = spawnSync("vue-tsc", ["--noEmit", "-p", project], {
  encoding: "utf8",
  shell: process.platform === "win32",
});

if (run.error) {
  console.error(`Could not run vue-tsc: ${run.error.message}`);
  process.exit(2);
}

const lines = `${run.stdout ?? ""}${run.stderr ?? ""}`.split("\n").filter(Boolean);
const isDiagnostic = (line) => /\(\d+,\d+\): error TS\d+:/.test(line);
const isVendored = (line) => line.startsWith("node_modules/") || line.includes("/node_modules/");

const ours = lines.filter((line) => isDiagnostic(line) && !isVendored(line));
const vendored = lines.filter((line) => isDiagnostic(line) && isVendored(line));
const other = lines.filter((line) => !isDiagnostic(line));

for (const line of ours) console.error(line);

if (vendored.length) {
  console.log(
    `\nnote: ignored ${vendored.length} diagnostic(s) from node_modules ` +
      `(vendored @voidzero-dev/vitepress-theme sources — not ours to fix).`,
  );
}

if (ours.length) {
  console.error(`\n${ours.length} type error(s) in first-party files.`);
  process.exit(1);
}

// vue-tsc can fail for reasons other than type errors (bad tsconfig, crash).
if (run.status !== 0 && !vendored.length) {
  for (const line of other) console.error(line);
  console.error(`\nvue-tsc exited with status ${run.status}.`);
  process.exit(2);
}

console.log("Types are clean (config, theme and .vue components).");
