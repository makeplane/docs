<script setup lang="ts">
/**
 * "Page not found" content, shared by both sites and rendered in two places so
 * humans and agents always see the same thing:
 *
 *  - each app's `docs/404.md` — VitePress server-renders it into the static
 *    404.html that Vercel serves (with a real 404 status) for unknown paths
 *  - the Layout's `not-found` slot — client-side navigation to a missing page
 *
 * Site-specific wording comes from `PlaneThemeOptions.notFound`.
 */
import { inject } from "vue";
import { useData, withBase } from "vitepress";
import { planeOptionsKey } from "../options";

const notFound = inject(planeOptionsKey, undefined)?.notFound;
const { page } = useData();
</script>

<template>
  <div class="plane-not-found vp-doc" :class="{ 'plane-not-found--standalone': page.isNotFound }">
    <p class="plane-not-found__code" aria-hidden="true">404</p>
    <h1>Page not found</h1>
    <p>
      There's no page at this address<template v-if="notFound"> on {{ notFound.siteName }}</template
      >. It may have moved, or the URL may be mistyped.
    </p>

    <h2>Where to look next</h2>
    <ul>
      <li><a :href="withBase('/')">Home</a> — the start page, with the full navigation.</li>
      <li>Search — press <kbd>⌘ K</kbd> (or <kbd>Ctrl K</kbd>) anywhere on the site.</li>
      <li><a :href="withBase('/sitemap.xml')">Sitemap</a> — every page URL.</li>
      <li>
        <a :href="withBase('/llms.txt')">llms.txt</a> — an index of every page with a one-line
        summary.
      </li>
      <li>
        <a :href="withBase('/llms-full.txt')">llms-full.txt</a> — the whole site as a single
        Markdown file.
      </li>
      <li v-if="notFound?.sibling">
        Looking for {{ notFound.sibling.covers }}? That lives on
        <a :href="notFound.sibling.url">{{ notFound.sibling.name }}</a> (<a
          :href="`${notFound.sibling.url}/llms.txt`"
          >llms.txt</a
        >).
      </li>
      <li v-if="notFound?.help">
        <a :href="notFound.help.link">{{ notFound.help.text }}</a>
      </li>
    </ul>

    <p>
      For agents: append <code>.md</code> to any page URL, or request it with
      <code>Accept: text/markdown</code>, to get the page as Markdown.
    </p>
  </div>
</template>

<style scoped>
/* Inside `404.md` the doc layout already provides padding; the `not-found`
   slot renders bare inside VPContent, so pad and centre it there. */
.plane-not-found--standalone {
  margin: 0 auto;
  max-width: 48rem;
  padding: 48px 24px 96px;
}

@media (min-width: 768px) {
  .plane-not-found--standalone {
    padding: 64px 32px 128px;
  }
}

.plane-not-found__code {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

.plane-not-found h1 {
  margin-top: 4px;
}
</style>
