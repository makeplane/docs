<!-- @format -->

<script setup lang="ts">
/**
 * "Copy page" split button + menu, rendered in the `doc-before` slot (see Layout.vue).
 *
 * The raw Markdown for every page is served next to the HTML at `<path>.md`
 * (config.ts `buildEnd()` copies the source files into dist/), so this component
 * only needs the current page's source path to copy / view / hand off to an AI tool.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData, useRoute, withBase } from "vitepress";
import { ArrowUpRight, Check, ChevronDown, Copy } from "lucide-vue-next";
import { CLAUDE_ICON, MARKDOWN_ICON, OPENAI_ICON } from "./copy-page-icons";

type Status = "idle" | "busy" | "copied" | "error";

const { page, frontmatter } = useData();
const route = useRoute();

const root = ref<HTMLElement | null>(null);
const toggleBtn = ref<HTMLButtonElement | null>(null);
const menu = ref<HTMLElement | null>(null);
const open = ref(false);
const status = ref<Status>("idle");
/** Filled on mount; only read inside the (client-only) menu. */
const origin = ref("");
let resetTimer: number | undefined;

/** Hidden on the 404 page and on pages that opt out with `copyPage: false`. */
const enabled = computed(
  () => !page.value.isNotFound && !!page.value.filePath && frontmatter.value.copyPage !== false,
);

/** Source path of the current page, e.g. "/ai/mcp-server.md" or "/index.md". */
const mdPath = computed(() => withBase("/" + page.value.filePath));

const prompt = computed(() =>
  encodeURIComponent(`Read ${origin.value}${mdPath.value} so I can ask questions about it.`),
);

const links = computed(() => [
  {
    title: "View as Markdown",
    desc: "View this page as plain text",
    href: mdPath.value,
    icon: MARKDOWN_ICON,
  },
  {
    title: "Open in ChatGPT",
    desc: "Ask questions about this page",
    href: `https://chatgpt.com/?hints=search&q=${prompt.value}`,
    icon: OPENAI_ICON,
  },
  {
    title: "Open in Claude",
    desc: "Ask questions about this page",
    href: `https://claude.ai/new?q=${prompt.value}`,
    icon: CLAUDE_ICON,
  },
]);

const label = computed(
  () =>
    ({ idle: "Copy page", busy: "Copy page", copied: "Copied", error: "Copy failed" })[
      status.value
    ],
);

/* ---------------------------------------------------------------------------
 * Markdown source — cached per path and prefetched on hover/focus so the
 * clipboard write can usually happen synchronously inside the click gesture.
 * ------------------------------------------------------------------------- */

interface MarkdownEntry {
  path: string;
  promise: Promise<string>;
  text?: string;
}

let cache: MarkdownEntry | null = null;

function loadMarkdown(): MarkdownEntry {
  const path = mdPath.value;
  if (cache?.path !== path) {
    const entry: MarkdownEntry = {
      path,
      promise: fetch(path, { headers: { Accept: "text/markdown" } }).then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
        return res.text();
      }),
    };
    entry.promise.then(
      (text) => {
        entry.text = text;
      },
      () => {
        if (cache === entry) cache = null;
      },
    );
    cache = entry;
  }
  return cache;
}

function prefetch(): void {
  loadMarkdown().promise.catch(() => {});
}

async function writeClipboard(entry: MarkdownEntry): Promise<void> {
  const clipboard = navigator.clipboard;

  // Fast path: text already loaded — write synchronously inside the gesture.
  if (clipboard && entry.text !== undefined) {
    return clipboard.writeText(entry.text);
  }

  // Safari drops the user activation after an `await`, but accepts a
  // promise-backed ClipboardItem, so register the write before fetching.
  if (clipboard?.write && typeof ClipboardItem !== "undefined") {
    const blob = entry.promise.then((text) => new Blob([text], { type: "text/plain" }));
    return clipboard.write([new ClipboardItem({ "text/plain": blob })]);
  }

  const text = await entry.promise;
  if (clipboard) return clipboard.writeText(text);

  // Non-secure contexts (e.g. http:// on a LAN IP) have no navigator.clipboard.
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.cssText = "position:fixed;top:0;left:0;opacity:0";
  document.body.append(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  if (!ok) throw new Error("execCommand('copy') failed");
}

function setStatus(next: Status): void {
  status.value = next;
  window.clearTimeout(resetTimer);
  if (next === "copied" || next === "error") {
    resetTimer = window.setTimeout(
      () => {
        status.value = "idle";
      },
      next === "error" ? 2500 : 2000,
    );
  }
}

async function copy(): Promise<void> {
  close();
  if (status.value === "busy") return;
  setStatus("busy");
  try {
    await writeClipboard(loadMarkdown());
    setStatus("copied");
  } catch (error) {
    console.error("[copy-page]", error);
    setStatus("error");
  }
}

/* ---------------------------------------------------------------------------
 * Menu open/close + keyboard handling
 * ------------------------------------------------------------------------- */

function menuItems(): HTMLElement[] {
  return Array.from(menu.value?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
}

function toggle(event: MouseEvent): void {
  open.value = !open.value;
  if (open.value) {
    prefetch();
    // Opened via keyboard (Enter/Space report detail === 0): move focus into the menu.
    if (event.detail === 0) nextTick(() => menuItems()[0]?.focus());
  }
}

function close(refocus = false): void {
  if (!open.value) return;
  open.value = false;
  if (refocus) toggleBtn.value?.focus();
}

function onMenuKeydown(event: KeyboardEvent): void {
  const items = menuItems();
  if (items.length === 0) return;
  const index = items.indexOf(document.activeElement as HTMLElement);
  if (event.key === "ArrowDown") {
    event.preventDefault();
    items[(index + 1) % items.length]?.focus();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    items[(index - 1 + items.length) % items.length]?.focus();
  }
}

function onDocumentPointerDown(event: PointerEvent): void {
  if (open.value && !root.value?.contains(event.target as Node)) close();
}

function onDocumentKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") close(true);
}

onMounted(() => {
  origin.value = window.location.origin;
  document.addEventListener("pointerdown", onDocumentPointerDown);
  document.addEventListener("keydown", onDocumentKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onDocumentPointerDown);
  document.removeEventListener("keydown", onDocumentKeydown);
  window.clearTimeout(resetTimer);
});

watch(
  () => route.path,
  () => {
    open.value = false;
    setStatus("idle");
  },
);
</script>

<template>
  <div v-if="enabled" ref="root" class="copy-page" @pointerenter="prefetch" @focusin="prefetch">
    <div class="copy-page__split">
      <button type="button" class="copy-page__main" :disabled="status === 'busy'" @click="copy">
        <component :is="status === 'copied' ? Check : Copy" :size="14" aria-hidden="true" />
        <span aria-live="polite">{{ label }}</span>
      </button>
      <button
        ref="toggleBtn"
        type="button"
        class="copy-page__toggle"
        aria-label="More copy options"
        aria-haspopup="menu"
        :aria-expanded="open"
        @click="toggle"
      >
        <ChevronDown :size="14" aria-hidden="true" />
      </button>
    </div>

    <div
      v-if="open"
      ref="menu"
      class="copy-page__menu"
      role="menu"
      aria-label="Copy page options"
      @keydown="onMenuKeydown"
    >
      <button type="button" role="menuitem" class="copy-page__item" @click="copy">
        <span class="copy-page__icon"><Copy :size="16" aria-hidden="true" /></span>
        <span class="copy-page__text">
          <span class="copy-page__title">Copy page</span>
          <span class="copy-page__desc">Copy page as Markdown for LLMs</span>
        </span>
      </button>
      <a
        v-for="link in links"
        :key="link.title"
        role="menuitem"
        class="copy-page__item"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        @click="close()"
      >
        <span class="copy-page__icon" v-html="link.icon" />
        <span class="copy-page__text">
          <span class="copy-page__title">
            {{ link.title }}
            <ArrowUpRight :size="12" aria-hidden="true" />
          </span>
          <span class="copy-page__desc">{{ link.desc }}</span>
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Placement inside the doc column lives in theme/style.css ("COPY PAGE MENU"). */
.copy-page {
  position: relative;
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  line-height: 1;
}

.copy-page__split {
  display: inline-flex;
  height: 34px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  overflow: hidden;
}

.copy-page__main,
.copy-page__toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 100%;
  padding: 0 10px;
  font: inherit;
  font-weight: 500;
  color: inherit;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.copy-page__main {
  /* "Copied" / "Copy failed" must not shift the chevron */
  min-width: 104px;
}

.copy-page__toggle {
  padding: 0 7px;
  border-left: 1px solid var(--vp-c-divider);
}

.copy-page__toggle svg {
  transition: transform 0.15s ease;
}

.copy-page__toggle[aria-expanded="true"] svg {
  transform: rotate(180deg);
}

.copy-page__main:hover,
.copy-page__toggle:hover,
.copy-page__toggle[aria-expanded="true"] {
  background: var(--vp-c-bg-soft);
}

.copy-page__main:disabled {
  cursor: default;
  opacity: 0.7;
}

.copy-page__main:focus-visible,
.copy-page__toggle:focus-visible,
.copy-page__item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.copy-page__menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 10;
  width: min(280px, calc(100vw - 48px));
  padding: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

.copy-page__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  color: var(--vp-c-text-1);
  text-align: left;
  text-decoration: none;
  font: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.copy-page__item:hover,
.copy-page__item:focus-visible {
  background: var(--vp-c-bg-soft);
}

.copy-page__icon {
  flex: none;
  display: inline-flex;
  width: 16px;
  height: 16px;
  margin-top: 1px;
}

/* v-html content isn't covered by scoped attributes */
.copy-page__icon :deep(svg) {
  width: 16px;
  height: 16px;
}

.copy-page__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.copy-page__title {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
}

.copy-page__desc {
  font-size: 12px;
  line-height: 1.35;
  color: var(--vp-c-text-2);
}

/* Dark: the docs override --vp-c-bg/--vp-c-bg-soft but not --vp-c-bg-elv (≈ page bg),
   so step the menu up with the docs' soft/mute tones. */
html.dark .copy-page__menu,
[data-theme="dark"] .copy-page__menu {
  background: var(--vp-c-bg-soft);
}

html.dark .copy-page__item:hover,
html.dark .copy-page__item:focus-visible,
[data-theme="dark"] .copy-page__item:hover,
[data-theme="dark"] .copy-page__item:focus-visible {
  background: var(--vp-c-bg-mute);
}

@media (prefers-reduced-motion: reduce) {
  .copy-page__main,
  .copy-page__toggle,
  .copy-page__toggle svg,
  .copy-page__item {
    transition: none;
  }
}

@media print {
  .copy-page {
    display: none;
  }
}
</style>
