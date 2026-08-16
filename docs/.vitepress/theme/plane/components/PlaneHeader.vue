<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";
import { normalizeLink } from "@vp-support/utils";
import { ref, computed, onMounted, onUnmounted, watch, nextTick, inject } from "vue";
import { getSearchProvider } from "@vp-support/search-config";
import { themeContextKey } from "@voidzero-dev/vitepress-theme";
import { planeOptionsKey } from "../options";
import VPNavBarSearch from "@vp-default/VPNavBarSearch.vue";
import VPNavBarMenuLink from "@vp-default/VPNavBarMenuLink.vue";
import VPNavBarMenuGroup from "@vp-default/VPNavBarMenuGroup.vue";
import VPNavBarAppearance from "@vp-default/VPNavBarAppearance.vue";
import VPSwitchAppearance from "@vp-default/VPSwitchAppearance.vue";
import VPNavBarSocialLinks from "@vp-default/VPNavBarSocialLinks.vue";
import VPSocialLinks from "@vp-default/VPSocialLinks.vue";
import { useLangs } from "@vp-composables/langs";

const SIGN_IN_RE = /sign-in/i;
const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;

const { theme, frontmatter, isDark } = useData<DefaultTheme.Config>();
const nav = computed<DefaultTheme.NavItem[]>(() => theme.value.nav ?? []);

/** VitePress allows `link` to be a function; the header only handles string links. */
type LinkNavItem = DefaultTheme.NavItemWithLink & { link: string };
/** Any level of the nav tree, including the groups nested inside a dropdown. */
type AnyNavItem = DefaultTheme.NavItem | DefaultTheme.NavItemChildren;

const isLinkItem = (item: AnyNavItem): item is LinkNavItem =>
  "link" in item && typeof item.link === "string";

/**
 * Nav items flagged with `planeButton: "primary" | "secondary"` render as header
 * buttons (Sign in / cross-site link) instead of nav links. A `/sign-in` link is
 * treated as the primary button even without the flag.
 */
const isPrimaryButtonItem = (item: DefaultTheme.NavItem): item is LinkNavItem =>
  isLinkItem(item) && (item.planeButton === "primary" || SIGN_IN_RE.test(item.link));

const isSecondaryButtonItem = (item: DefaultTheme.NavItem): item is LinkNavItem =>
  isLinkItem(item) && item.planeButton === "secondary";

const isNavButtonItem = (item: DefaultTheme.NavItem) =>
  isPrimaryButtonItem(item) || isSecondaryButtonItem(item);

const mainNav = computed(() => nav.value.filter((item) => !isNavButtonItem(item)));

const signInNavItem = computed(() => nav.value.find(isPrimaryButtonItem));

const secondaryNavItem = computed(() => nav.value.find(isSecondaryButtonItem));

const route = useRoute();
const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
const isForcedTheme = computed(() => !!frontmatter.value.theme);
const { logoDark, logoLight, logoAlt } = inject(themeContextKey)!;
const menuTitle = inject(planeOptionsKey)?.brand.menuTitle ?? logoAlt;

const isMarketingPage = computed(() => {
  const layout = frontmatter.value.layout;
  return layout === "home" || (layout && layout !== "doc" && layout !== "page");
});

const isSearchAvailable = computed(() => {
  const provider = getSearchProvider(theme.value);
  return provider === "local" || provider === "algolia";
});

const mobileMenuOpen = ref(false);
const expandedAccordions = ref<Set<number>>(new Set());
const languageMenuOpen = ref(false);

const isDropdown = (item: AnyNavItem): item is DefaultTheme.NavItemWithChildren =>
  "items" in item && Array.isArray(item.items);
const isExternalLink = (link: string) => EXTERNAL_URL_RE.test(link);

const toggleAccordion = (index: number) => {
  if (expandedAccordions.value.has(index)) {
    expandedAccordions.value.delete(index);
  } else {
    expandedAccordions.value.add(index);
  }
  expandedAccordions.value = new Set(expandedAccordions.value);
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && mobileMenuOpen.value) {
    closeMobileMenu();
  }
};

/**
 * `position: fixed` on <body> drops the document scroll to 0, so remember the
 * offset and restore it on unlock — otherwise opening the mobile menu part-way
 * down a page sends the reader back to the top when they close it.
 */
let lockedScrollY = 0;

const lockBodyScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  lockedScrollY = window.scrollY;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.top = `-${lockedScrollY}px`;
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
};

const unlockBodyScroll = () => {
  const wasLocked = document.body.style.position === "fixed";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
  document.body.style.top = "";
  document.body.style.paddingRight = "";
  if (wasLocked) {
    window.scrollTo(0, lockedScrollY);
    lockedScrollY = 0;
  }
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  expandedAccordions.value = new Set();
  languageMenuOpen.value = false;
  unlockBodyScroll();
};

const triggerSearch = () => {
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      metaKey: true,
      ctrlKey: true,
      bubbles: true,
    }),
  );
};

const focusTrap = {
  firstFocusableEl: null as HTMLElement | null,
  lastFocusableEl: null as HTMLElement | null,

  activate: () => {
    const mobileMenu = document.getElementById("mobile-menu");
    if (!mobileMenu) return;

    const focusableElements = mobileMenu.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) return;

    focusTrap.firstFocusableEl = focusableElements[0] as HTMLElement;
    focusTrap.lastFocusableEl = focusableElements[focusableElements.length - 1] as HTMLElement;
    focusTrap.firstFocusableEl?.focus();
    document.addEventListener("keydown", focusTrap.handleTabKey);
  },

  deactivate: () => {
    document.removeEventListener("keydown", focusTrap.handleTabKey);
    focusTrap.firstFocusableEl = null;
    focusTrap.lastFocusableEl = null;
  },

  handleTabKey: (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === focusTrap.firstFocusableEl) {
        focusTrap.lastFocusableEl?.focus();
        e.preventDefault();
      }
    } else if (document.activeElement === focusTrap.lastFocusableEl) {
      focusTrap.firstFocusableEl?.focus();
      e.preventDefault();
    }
  },
};

watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => focusTrap.activate());
  } else {
    focusTrap.deactivate();
  }
});

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  unlockBodyScroll();
});
</script>

<template>
  <div
    class="plane-header-shell"
    :data-theme="isDark ? 'dark' : undefined"
    :class="
      isMarketingPage
        ? 'relative w-full z-50'
        : 'plane-header-shell--docs relative w-full z-50 lg:fixed lg:top-[var(--vp-banner-height,0)]'
    "
  >
    <header
      class="plane-header wrapper relative border-b border-stroke dark:border-nickel"
      :data-theme="isDark ? 'dark' : 'light'"
    >
      <div class="plane-header__start">
        <a href="/" class="plane-header__brand">
          <slot name="nav-bar-title-before" />
          <img
            class="plane-header__logo plane-header__logo--light-bg"
            :src="logoDark"
            :alt="logoAlt"
          />
          <img
            class="plane-header__logo plane-header__logo--dark-bg"
            :src="logoLight"
            :alt="logoAlt"
          />
          <slot name="nav-bar-title-after" />
        </a>

        <nav v-if="mainNav.length" class="plane-header__nav" aria-labelledby="plane-main-nav-label">
          <span id="plane-main-nav-label" class="visually-hidden">Main Navigation</span>
          <template v-for="item in mainNav" :key="JSON.stringify(item)">
            <VPNavBarMenuLink v-if="'link' in item" :item="item" />
            <component v-else-if="'component' in item" :is="item.component" v-bind="item.props" />
            <VPNavBarMenuGroup v-else :item="item" />
          </template>
        </nav>
      </div>

      <div v-if="isSearchAvailable" class="plane-header__search">
        <VPNavBarSearch />
      </div>

      <div class="plane-header__actions">
        <VPNavBarMenuLink
          v-if="secondaryNavItem"
          :item="secondaryNavItem"
          class="home-doc-actions__btn home-doc-actions__btn--secondary home-doc-actions__btn--nav"
        />
        <VPNavBarMenuLink
          v-if="signInNavItem"
          :item="signInNavItem"
          class="home-doc-actions__btn home-doc-actions__btn--primary home-doc-actions__btn--nav"
        />
        <span
          v-if="signInNavItem && !isForcedTheme"
          class="plane-header__divider"
          aria-hidden="true"
        />
        <VPNavBarAppearance v-if="!isForcedTheme" />
        <span class="plane-header__divider" aria-hidden="true" />
        <VPNavBarSocialLinks />
      </div>

      <div class="plane-header__mobile">
        <button
          v-if="isSearchAvailable"
          type="button"
          aria-label="Search"
          class="plane-header__mobile-btn"
          @click="triggerSearch"
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" stroke-linecap="round" />
          </svg>
        </button>
        <button
          type="button"
          class="plane-header__mobile-btn"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="toggleMobileMenu"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="size-6"
            viewBox="0 0 18 8"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M0 0.75H18" stroke="currentColor" stroke-width="1.5" />
            <path d="M0 6.75H18" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <svg
            v-else
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </header>

    <div
      v-if="!isMarketingPage"
      class="wrapper relative h-0 tick-left tick-right max-w-full overflow-x-clip"
    ></div>

    <div
      v-if="mobileMenuOpen"
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      :data-theme="isForcedTheme ? 'dark' : undefined"
      class="lg:hidden fixed inset-0 z-[1001] bg-white dark:bg-primary"
    >
      <section class="wrapper animate-fade-in">
        <div class="w-full pl-5 pr-5 py-5 lg:py-7 flex items-center justify-between">
          <a href="/" class="flex items-center gap-2">
            <img
              class="plane-header__logo plane-header__logo--light-bg"
              :src="logoDark"
              :alt="logoAlt"
            />
            <img
              class="plane-header__logo plane-header__logo--dark-bg"
              :src="logoLight"
              :alt="logoAlt"
            />
            <span class="text-base font-medium text-primary dark:text-white">{{ menuTitle }}</span>
          </a>
          <div class="flex items-center gap-2">
            <button
              v-if="isSearchAvailable"
              type="button"
              aria-label="Search"
              class="p-2 text-primary dark:text-white hover:opacity-70 transition-opacity cursor-pointer"
              @click="triggerSearch"
            >
              <svg
                class="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" stroke-linecap="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Close navigation menu"
              class="p-2 -mr-2 text-primary dark:text-white hover:opacity-70 transition-opacity"
              @click="closeMobileMenu"
            >
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          class="overflow-y-auto flex flex-col [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style="height: calc(100vh - var(--vp-nav-height, 84px))"
        >
          <nav class="flex-1 w-full pt-6 pb-8">
            <ul class="space-y-1">
              <li v-for="(navItem, index) in mainNav" :key="index">
                <template v-if="isDropdown(navItem)">
                  <button
                    type="button"
                    class="w-full flex items-center justify-between py-3 px-4 text-base font-sans text-primary dark:text-white"
                    :aria-expanded="expandedAccordions.has(index)"
                    @click="toggleAccordion(index)"
                  >
                    <span>{{ navItem.text }}</span>
                    <svg
                      class="size-4 transition-transform duration-200"
                      :class="{ 'rotate-180': expandedAccordions.has(index) }"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                  <ul v-show="expandedAccordions.has(index)" class="pl-4 space-y-1">
                    <template v-for="(childItem, childIndex) in navItem.items" :key="childIndex">
                      <li v-if="isLinkItem(childItem)">
                        <a
                          :href="normalizeLink(childItem.link)"
                          :target="isExternalLink(childItem.link) ? '_blank' : undefined"
                          :rel="isExternalLink(childItem.link) ? 'noreferrer' : undefined"
                          :class="[
                            {
                              'bg-primary/10 dark:bg-white/10':
                                route.path === normalizeLink(childItem.link),
                            },
                            { 'vp-external-link-icon': isExternalLink(childItem.link) },
                          ]"
                          class="block py-1.5 px-4 text-sm font-sans text-grey dark:text-white/80 hover:text-primary dark:hover:text-white"
                          @click="closeMobileMenu"
                        >
                          {{ childItem.text }}
                        </a>
                      </li>
                      <li v-else-if="isDropdown(childItem)">
                        <p
                          v-if="childItem.text"
                          class="pt-3 pb-1 px-4 text-xs font-semibold uppercase tracking-wider text-grey/70 dark:text-white/50"
                        >
                          {{ childItem.text }}
                        </p>
                        <ul class="pl-4 space-y-1">
                          <li
                            v-for="(nestedItem, nestedIndex) in childItem.items"
                            :key="nestedIndex"
                          >
                            <a
                              v-if="isLinkItem(nestedItem)"
                              :href="normalizeLink(nestedItem.link)"
                              :target="isExternalLink(nestedItem.link) ? '_blank' : undefined"
                              :rel="isExternalLink(nestedItem.link) ? 'noreferrer' : undefined"
                              :class="[
                                {
                                  'bg-primary/10 dark:bg-white/10':
                                    route.path === normalizeLink(nestedItem.link),
                                },
                                { 'vp-external-link-icon': isExternalLink(nestedItem.link) },
                              ]"
                              class="block py-1.5 px-4 text-sm font-sans text-grey dark:text-white/80 hover:text-primary dark:hover:text-white"
                              @click="closeMobileMenu"
                            >
                              {{ nestedItem.text }}
                            </a>
                          </li>
                        </ul>
                      </li>
                    </template>
                  </ul>
                </template>
                <a
                  v-else-if="isLinkItem(navItem)"
                  :href="normalizeLink(navItem.link)"
                  :target="isExternalLink(navItem.link) ? '_blank' : undefined"
                  :rel="isExternalLink(navItem.link) ? 'noreferrer' : undefined"
                  :class="[
                    {
                      'bg-primary/10 dark:bg-white/10': route.path === normalizeLink(navItem.link),
                    },
                    { 'vp-external-link-icon': isExternalLink(navItem.link) },
                  ]"
                  class="block py-3 px-4 text-base font-sans text-primary dark:text-white"
                  @click="closeMobileMenu"
                >
                  {{ navItem.text }}
                </a>
                <!-- `{ component }` nav items have no mobile representation; skip them. -->
                <span
                  v-else-if="'text' in navItem"
                  class="block py-3 px-4 text-base font-sans text-primary dark:text-white"
                >
                  {{ navItem.text }}
                </span>
              </li>
            </ul>
          </nav>

          <div
            class="w-full pt-6 pb-12 border-t border-stroke dark:border-nickel relative tick-left tick-right mt-auto"
          >
            <div class="space-y-6">
              <div v-if="secondaryNavItem || signInNavItem" class="flex flex-col gap-2 px-4">
                <a
                  v-if="secondaryNavItem"
                  :href="secondaryNavItem.link"
                  target="_blank"
                  rel="noreferrer"
                  class="home-doc-actions__btn home-doc-actions__btn--secondary home-doc-actions__btn--nav w-full"
                  @click="closeMobileMenu"
                >
                  {{ secondaryNavItem.text }}
                </a>
                <a
                  v-if="signInNavItem"
                  :href="signInNavItem.link"
                  target="_blank"
                  rel="noreferrer"
                  class="home-doc-actions__btn home-doc-actions__btn--primary home-doc-actions__btn--nav w-full"
                  @click="closeMobileMenu"
                >
                  {{ signInNavItem.text }}
                </a>
              </div>

              <div v-if="localeLinks.length && currentLang.label" class="px-4">
                <button
                  type="button"
                  class="w-full flex items-center justify-between text-grey dark:text-white/80 text-sm font-medium"
                  :aria-expanded="languageMenuOpen"
                  @click="languageMenuOpen = !languageMenuOpen"
                >
                  <span>{{ theme.langMenuLabel || "Language" }}</span>
                  <svg
                    class="size-4 transition-transform duration-200"
                    :class="{ 'rotate-180': languageMenuOpen }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <ul v-show="languageMenuOpen" class="mt-3 space-y-1">
                  <li v-for="locale in localeLinks" :key="locale.link">
                    <a
                      :href="locale.link"
                      class="block py-2 text-sm text-primary dark:text-white hover:opacity-70 transition-opacity"
                      @click="closeMobileMenu"
                    >
                      {{ locale.text }}
                    </a>
                  </li>
                </ul>
              </div>

              <div v-if="!isForcedTheme" class="flex items-center justify-between px-4">
                <span class="text-grey dark:text-white/80 text-sm font-medium">Appearance</span>
                <VPSwitchAppearance />
              </div>

              <div class="flex items-center justify-center gap-4 pt-4">
                <VPSocialLinks
                  v-if="theme.socialLinks"
                  :links="theme.socialLinks"
                  @click="closeMobileMenu"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 300ms ease-out 100ms forwards;
  opacity: 0;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.plane-header__brand {
  display: inline-flex;
  align-items: center;
  align-self: center;
  height: auto;
  line-height: 0;
}

.plane-header__logo {
  display: block;
  height: var(--plane-header-logo-height, 1.6875rem);
  width: auto;
  max-width: none;
  flex-shrink: 0;
  object-fit: contain;
}

/* Swap logos via html.dark / data-theme — avoids isDark reactivity lag on toggle */
.plane-header__logo--dark-bg {
  display: none;
}

html.dark .plane-header__logo--light-bg,
[data-theme="dark"] .plane-header__logo--light-bg {
  display: none;
}

html.dark .plane-header__logo--dark-bg,
[data-theme="dark"] .plane-header__logo--dark-bg {
  display: block;
}

[data-theme="light"] .plane-header__logo--dark-bg {
  display: none;
}

[data-theme="light"] .plane-header__logo--light-bg {
  display: block;
}

.plane-header__mobile {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.plane-header-shell {
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
  background: var(--plane-header-bg);
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .plane-header-shell {
    max-width: calc(100vw - 2rem);
    margin-left: auto;
    margin-right: auto;
  }
}

@media (min-width: 90rem) {
  .plane-header-shell {
    max-width: 90rem;
  }
}

.plane-header__start .plane-header__nav,
.plane-header__search,
.plane-header__actions {
  display: none;
}

@media (min-width: 1024px) {
  .plane-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 240px auto;
    align-items: center;
    gap: 0.5rem 0.75rem;
    padding: var(--plane-header-padding-y, 1.125rem) var(--plane-header-padding-x, 1.375rem);
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: clip;
    background: var(--plane-header-bg);
    border-bottom-color: var(--plane-header-border) !important;
  }

  .plane-header__start {
    grid-column: 1;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .plane-header__brand {
    flex-shrink: 0;
    gap: 0.625rem;
    min-width: 0;
    padding: 0;
    margin: 0;
  }

  .plane-header__title {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--plane-header-text);
    white-space: nowrap;
    letter-spacing: -0.01em;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .plane-header__search {
    grid-column: 2;
    display: flex;
    align-items: center;
    width: 240px;
    max-width: 240px;
    min-width: 0;
    overflow: hidden;
  }

  .plane-header__start .plane-header__nav {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.125rem;
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
  }

  .plane-header__actions {
    grid-column: 3;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    flex-shrink: 0;
    min-width: 0;
  }

  .plane-header__mobile {
    display: none;
  }

  .plane-header__divider {
    width: 1px;
    height: var(--plane-header-logo-height, 1.6875rem);
    background: var(--plane-header-divider);
    flex-shrink: 0;
  }

  .plane-header__mobile-btn {
    display: none;
  }
}

@media (max-width: 1023px) {
  .plane-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--plane-header-padding-y, 1.125rem) var(--plane-header-padding-x, 1.375rem);
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: clip;
    background: transparent;
  }

  .plane-header__brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .plane-header__logo {
    height: var(--plane-header-logo-height, 1.5rem);
  }

  .plane-header__title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--plane-header-text);
  }

  .plane-header__mobile-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    color: var(--plane-header-text);
    cursor: pointer;
    background: transparent;
    border: none;
  }
}
</style>
