<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vitepress";

type Version = {
  label: string;
  value: string;
  /** Path prefix identifying a page as belonging to this version. */
  prefix: string;
  /** Where switching to this version lands. */
  entry: string;
};

const VERSIONS: Version[] = [
  {
    label: "v2",
    value: "v2",
    prefix: "/api-reference/v2/",
    entry: "/api-reference/v2/introduction",
  },
  {
    label: "v1",
    value: "v1",
    prefix: "/api-reference/v1/",
    entry: "/api-reference/v1/introduction",
  },
];

const route = useRoute();

/** Strip the .html the dev server and non-cleanUrl hosts append. */
const path = computed(() => route.path.replace(/\.html$/, ""));

const isApiReference = computed(() => path.value.startsWith("/api-reference/"));

/** v2 is the default for any unversioned /api-reference/ path. */
const current = computed(
  () => VERSIONS.find((v) => path.value.startsWith(v.prefix))?.value ?? "v2",
);
</script>

<template>
  <!--
    Plain links, not a <select>: Vue's SSR drops `selected` on options inside a
    bound select, so a dropdown would render the wrong version before hydration
    and would not work at all without JS. Each link navigates to that version's
    entry page, and the sidebar tree swaps via the path-prefix keys in config.mts.
  -->
  <nav v-if="isApiReference" class="api-version-switcher" aria-label="API version">
    <span class="api-version-switcher-label">API version</span>

    <div class="api-version-switcher-options">
      <a
        v-for="version in VERSIONS"
        :key="version.value"
        class="api-version-switcher-option"
        :class="{ 'is-active': version.value === current }"
        :href="version.entry"
        :aria-current="version.value === current ? 'true' : undefined"
      >
        {{ version.label }}
        <span v-if="version.value === 'v2'" class="api-version-switcher-tag">latest</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.api-version-switcher {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.api-version-switcher-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.api-version-switcher-options {
  display: flex;
  gap: 4px;
  padding: 3px;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.api-version-switcher-option {
  display: inline-flex;
  flex: 1;
  gap: 5px;
  align-items: baseline;
  justify-content: center;
  padding: 5px 8px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 6px;
  transition:
    color 0.2s,
    background-color 0.2s;
}

.api-version-switcher-option:hover {
  color: var(--vp-c-text-1);
}

.api-version-switcher-option.is-active {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  box-shadow: 0 1px 2px rgb(0 0 0 / 8%);
}

.api-version-switcher-option:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.api-version-switcher-tag {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-3);
}

.api-version-switcher-option.is-active .api-version-switcher-tag {
  color: var(--vp-c-brand-1);
}
</style>
