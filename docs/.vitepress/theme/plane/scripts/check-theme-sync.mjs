#!/usr/bin/env node
/**
 * check-theme-sync — verify that docs/.vitepress/theme/plane/ is byte-identical to the
 * sibling repo's copy (makeplane/docs ⇄ makeplane/developer-docs).
 *
 *   node docs/.vitepress/theme/plane/scripts/check-theme-sync.mjs --sibling makeplane/developer-docs
 *
 * Sibling source, in order of preference:
 *   1. THEME_SIBLING_PATH — local checkout root (e.g. ../developer-docs)
 *   2. https://raw.githubusercontent.com/<sibling>/<ref>/… — ref from THEME_SIBLING_REF,
 *      then GITHUB_HEAD_REF (same-named PR branch), then master.
 *
 * While only one repo has adopted the shared theme the sibling has no `plane/` folder yet.
 * That is reported and skipped (exit 0) rather than failing, so unrelated PRs in the repo
 * that merged first are not blocked; the check becomes binding as soon as both sides have it.
 *
 * Exit codes: 0 identical (or sibling not adopted yet) · 1 drift (or manifest out of date)
 *             · 2 sibling unreachable / bad args
 */
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const THEME_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const THEME_REL = "docs/.vitepress/theme/plane";

const args = process.argv.slice(2);
const siblingArg = args[args.indexOf("--sibling") + 1];
if (!args.includes("--sibling") || !siblingArg || !siblingArg.includes("/")) {
  console.error("usage: check-theme-sync.mjs --sibling <owner/repo>");
  process.exit(2);
}

const sha = (buf) => createHash("sha256").update(buf).digest("hex");

async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, base)));
    else out.push(relative(base, full).split("\\").join("/"));
  }
  return out.sort();
}

async function readLocal(file) {
  return readFile(join(THEME_DIR, file));
}

/** Present on every ref of both repos — tells "ref exists" apart from "ref has no plane/". */
const ROOT_PROBE = "package.json";

async function makeSiblingReader() {
  const localPath = process.env.THEME_SIBLING_PATH;
  if (localPath) {
    const checkout = resolve(process.cwd(), localPath);
    const root = join(checkout, THEME_REL);
    const exists = (file) =>
      readFile(file).then(
        () => true,
        () => false,
      );
    if (await exists(join(root, "manifest.json"))) {
      return {
        status: "ok",
        label: root,
        read: (file) => readFile(join(root, file)).catch(() => null),
      };
    }
    return (await exists(join(checkout, ROOT_PROBE)))
      ? { status: "not-adopted", label: checkout }
      : null;
  }

  const refs = [process.env.THEME_SIBLING_REF, process.env.GITHUB_HEAD_REF, "master"].filter(
    Boolean,
  );
  let reachable = null;
  for (const ref of refs) {
    const root = `https://raw.githubusercontent.com/${siblingArg}/${ref}/`;
    const base = `${root}${THEME_REL}/`;
    const probe = await fetch(base + "manifest.json").catch(() => null);
    if (probe?.ok) {
      return {
        status: "ok",
        label: base,
        read: async (file) => {
          const res = await fetch(base + file).catch(() => null);
          return res?.ok ? Buffer.from(await res.arrayBuffer()) : null;
        },
      };
    }
    if (!reachable) {
      const rootProbe = await fetch(root + ROOT_PROBE).catch(() => null);
      if (rootProbe?.ok) reachable = `${siblingArg}@${ref}`;
    }
  }
  return reachable ? { status: "not-adopted", label: reachable } : null;
}

const manifest = JSON.parse(await readLocal("manifest.json"));
const listed = [...manifest.files].sort();
const onDisk = await walk(THEME_DIR);

let failed = false;
const missingFromManifest = onDisk.filter((f) => !listed.includes(f));
const missingFromDisk = listed.filter((f) => !onDisk.includes(f));
if (missingFromManifest.length || missingFromDisk.length) {
  failed = true;
  console.error("manifest.json is out of date:");
  for (const f of missingFromManifest) console.error(`  not listed:  ${f}`);
  for (const f of missingFromDisk) console.error(`  not on disk: ${f}`);
}

const sibling = await makeSiblingReader();
if (!sibling) {
  console.error(
    `Could not reach the sibling repo (${siblingArg}). Set THEME_SIBLING_PATH=../<repo> for a local checkout.`,
  );
  process.exit(2);
}

if (sibling.status === "not-adopted") {
  console.log(
    `${sibling.label} has no ${THEME_REL} yet — skipping the cross-repo comparison.\n` +
      `This is expected only until the companion PR lands; the check binds once both repos have the folder.`,
  );
  process.exit(failed ? 1 : 0);
}

console.log(`Comparing ${THEME_REL} against ${sibling.label}`);

const siblingManifestRaw = await sibling.read("manifest.json");
const siblingFiles = siblingManifestRaw ? JSON.parse(siblingManifestRaw.toString()).files : [];
const all = [...new Set([...listed, ...siblingFiles])].sort();

for (const file of all) {
  const [local, remote] = await Promise.all([
    readLocal(file).catch(() => null),
    sibling.read(file),
  ]);
  let status;
  if (!local) status = "MISSING (local)";
  else if (!remote) status = "MISSING (sibling)";
  else status = sha(local) === sha(remote) ? "OK" : "DIFF";
  if (status !== "OK") failed = true;
  console.log(`${status.padEnd(18)} ${file}`);
}

if (failed) {
  console.error(
    "\nTheme drift detected. Copy the folder to/from the sibling repo so both are identical.",
  );
  process.exit(1);
}
console.log("\nShared theme is in sync.");
