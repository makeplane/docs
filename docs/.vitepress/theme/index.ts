import type { Theme } from "vitepress";
import type { ThemeContext } from "@voidzero-dev/vitepress-theme";
import VoidZeroTheme from "@voidzero-dev/vitepress-theme";
import { themeContextKey } from "@voidzero-dev/vitepress-theme";
import { onMounted, onUnmounted, watch, nextTick } from "vue";
import { useData, useRoute } from "vitepress";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import mediumZoom from "medium-zoom";
import Card from "./components/Card.vue";
import CardGroup from "./components/CardGroup.vue";
import Tags from "./components/Tags.vue";
import Layout from "./Layout.vue";
import "./style.css";

/**
 * OSSHeader (used on doc pages) injects this context for the bar logo — *not* `themeConfig.logo`.
 * The `viteplus` entry in the package overwrites it with "Vite+" assets; we use the base
 * `VoidZeroTheme` and provide Plane branding here.
 */
const planeThemeContext: ThemeContext = {
  /* OSSHeader renders logoDark in light mode and logoLight in dark mode. */
  logoDark: "https://media.docs.plane.so/logo/new-logo-white.png",
  logoLight: "https://media.docs.plane.so/logo/new-logo-dark.png",
  logoAlt: "Plane",
  footerBg: "https://media.docs.plane.so/logo/og-docs.webp",
  monoIcon: "https://media.docs.plane.so/logo/favicon-32x32.png",
};

/**
 * Handles tab activation based on URL hash
 */
function handleTabHash() {
  if (typeof document === "undefined") return;

  const hash = window.location.hash.slice(1); // Remove the '#'
  if (!hash) return;

  const tabButtons = document.querySelectorAll('[role="tab"]');

  if (tabButtons.length === 0) {
    return;
  }

  tabButtons.forEach((button) => {
    const labelText = button.textContent?.trim().toLowerCase().replace(/\s+/g, "-");

    if (labelText === hash) {
      const element = button as HTMLElement;

      // Dispatch a proper mouse event
      const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      element.dispatchEvent(clickEvent);
      element.click();
      element.focus();
    }
  });
}

/**
 * Adds click listeners to tabs to update URL hash
 */
function setupTabHashUpdates() {
  if (typeof document === "undefined") return;

  const tabButtons = document.querySelectorAll('[role="tab"]');

  tabButtons.forEach((button) => {
    const element = button as HTMLElement;

    // Remove existing listener if any
    element.removeEventListener("click", updateHashOnTabClick);

    // Add new listener
    element.addEventListener("click", updateHashOnTabClick);
  });
}

function updateHashOnTabClick(event: Event) {
  const button = event.currentTarget as HTMLElement;
  const labelText = button.textContent?.trim().toLowerCase().replace(/\s+/g, "-");

  if (labelText) {
    // Update URL hash without triggering scroll
    history.replaceState(null, "", `#${labelText}`);
  }
}

/**
 * Move "Sign in" CTA to the right utility area (between search and theme toggle).
 * The upstream OSSHeader renders nav links on the left; we remap only this CTA.
 * Returns true if the link was found and moved (or already in the target region).
 */
function moveSignInToUtilityArea(): boolean {
  if (typeof document === "undefined") return false;

  const signInLink = document.querySelector(
    '.docs-layout header a.VPLink[href*="sign-in"]',
  ) as HTMLAnchorElement | null;
  if (!signInLink) return false;

  if (signInLink.classList.contains("sign-in-relocated")) {
    return true;
  }

  const appearanceToggle = document.querySelector(
    ".docs-layout header .VPNavBarAppearance",
  ) as HTMLElement | null;

  if (
    appearanceToggle?.parentElement &&
    signInLink.parentElement === appearanceToggle.parentElement
  ) {
    signInLink.classList.add("sign-in-relocated");
    return true;
  }

  const extraMenu = document.querySelector(
    ".docs-layout header .VPNavBarExtra",
  ) as HTMLElement | null;
  if (extraMenu?.parentElement && signInLink.parentElement === extraMenu.parentElement) {
    signInLink.classList.add("sign-in-relocated");
    return true;
  }

  // Desktop (xl+): insert before theme toggle inside the utilities row.
  if (
    appearanceToggle?.parentElement &&
    signInLink.parentElement !== appearanceToggle.parentElement
  ) {
    signInLink.classList.add("sign-in-relocated");
    appearanceToggle.parentElement.insertBefore(signInLink, appearanceToggle);
    return true;
  }

  // Tablet fallback (lg-xl): keep it in right controls row before the extra menu.
  if (extraMenu?.parentElement && signInLink.parentElement !== extraMenu.parentElement) {
    signInLink.classList.add("sign-in-relocated");
    extraMenu.parentElement.insertBefore(signInLink, extraMenu);
    return true;
  }

  return false;
}

let signInRelocateWarned = false;

function runSignInRelocationWithRetries() {
  if (typeof document === "undefined" || !document.querySelector(".docs-layout")) {
    return;
  }

  const tryOnce = (attempt: number) => {
    if (moveSignInToUtilityArea()) {
      return;
    }
    if (attempt < 40) {
      window.setTimeout(() => tryOnce(attempt + 1), 75);
    } else if (!signInRelocateWarned) {
      const link = document.querySelector('.docs-layout header a.VPLink[href*="sign-in"]');
      if (link && !link.classList.contains("sign-in-relocated")) {
        signInRelocateWarned = true;
        console.warn(
          "[plane-docs] Sign-in could not be relocated (header not ready or selectors changed).",
        );
      }
    }
  };

  tryOnce(0);
}

function debounce(fn: () => void, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (t) clearTimeout(t);
    t = setTimeout(fn, ms);
  };
}

export default {
  extends: VoidZeroTheme,
  Layout,
  enhanceApp(ctx) {
    VoidZeroTheme.enhanceApp?.(ctx);
    ctx.app.provide(themeContextKey, planeThemeContext);
    enhanceAppWithTabs(ctx.app);
    ctx.app.component("Card", Card);
    ctx.app.component("CardGroup", CardGroup);
    ctx.app.component("Tags", Tags);
  },
  setup() {
    if (typeof window === "undefined") return;

    const route = useRoute();
    const { isDark } = useData();

    /**
     * VitePress’s inline "check-dark-mode" script only adds the `dark` class and
     * never removes it, so a stale `class="dark"` on <html> (e.g. after SSG) can
     * persist in light mode. That leaves `.dark …` global/navbar rules applied
     * until a theme toggle re-syncs. Keep `documentElement` in lockstep with
     * `isDark` (same source of truth as the toggle).
     */
    const syncOssHeaderThemeAttr = (dark: boolean) => {
      const header = document.querySelector(
        ".docs-layout header",
      ) as HTMLElement | null;
      const bar = header?.parentElement;
      if (!bar) return;
      if (dark) bar.setAttribute("data-theme", "dark");
      else bar.removeAttribute("data-theme");
    };

    watch(
      isDark,
      (dark) => {
        document.documentElement.classList.toggle("dark", dark);
        syncOssHeaderThemeAttr(dark);
      },
      { immediate: true },
    );

    onMounted(() => {
      syncOssHeaderThemeAttr(isDark.value);
    });

    const zoom = mediumZoom(".vp-doc img", {
      background: "rgba(0, 0, 0, 0.8)",
    });

    let headerObserver: MutationObserver | null = null;
    let onResize: (() => void) | null = null;

    onMounted(() => {
      // Delay tab hash handling to ensure tabs are rendered
      setTimeout(() => {
        handleTabHash();
        setupTabHashUpdates();
        runSignInRelocationWithRetries();
      }, 100);

      const onHeaderMutations = debounce(() => {
        runSignInRelocationWithRetries();
      }, 100);

      const tryAttachHeaderObserver = () => {
        if (headerObserver) return;
        const h = document.querySelector(".docs-layout header");
        if (!h) return;
        headerObserver = new MutationObserver(onHeaderMutations);
        headerObserver.observe(h, { childList: true, subtree: true });
      };
      tryAttachHeaderObserver();
      if (!headerObserver) {
        const id = window.setInterval(() => {
          tryAttachHeaderObserver();
          if (headerObserver) {
            clearInterval(id);
          }
        }, 120);
        window.setTimeout(() => clearInterval(id), 5000);
      }

      onResize = debounce(() => {
        runSignInRelocationWithRetries();
      }, 150);
      window.addEventListener("resize", onResize);

      // Listen for hash changes
      window.addEventListener("hashchange", () => {
        nextTick(handleTabHash);
      });
    });

    onUnmounted(() => {
      headerObserver?.disconnect();
      headerObserver = null;
      if (onResize) {
        window.removeEventListener("resize", onResize);
        onResize = null;
      }
    });

    // Watch for route changes
    watch(
      () => route.path,
      () => {
        nextTick(() => {
          zoom.detach();
          zoom.attach(":not(a) > img:not(.VPImage)");
          handleTabHash();
          setupTabHashUpdates();
          runSignInRelocationWithRetries();
        });
      },
    );
  },
} satisfies Theme;
