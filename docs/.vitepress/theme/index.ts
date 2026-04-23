import type { Theme } from "vitepress";
import type { ThemeContext } from "@voidzero-dev/vitepress-theme";
import VoidZeroTheme from "@voidzero-dev/vitepress-theme";
import { themeContextKey } from "@voidzero-dev/vitepress-theme";
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
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
 */
function moveSignInToUtilityArea() {
  if (typeof document === "undefined") return;

  const signInLink = document.querySelector(
    '.docs-layout header .VPNavBarMenu a.VPLink[href*="sign-in"]',
  ) as HTMLAnchorElement | null;
  if (!signInLink) return;

  const appearanceToggle = document.querySelector(
    ".docs-layout header .VPNavBarAppearance",
  ) as HTMLElement | null;

  // Desktop (xl+): insert before theme toggle inside the utilities row.
  if (
    appearanceToggle?.parentElement &&
    signInLink.parentElement !== appearanceToggle.parentElement
  ) {
    signInLink.classList.add("sign-in-relocated");
    appearanceToggle.parentElement.insertBefore(signInLink, appearanceToggle);
    return;
  }

  // Tablet fallback (lg-xl): keep it in right controls row before the extra menu.
  const extraMenu = document.querySelector(
    ".docs-layout header .VPNavBarExtra",
  ) as HTMLElement | null;
  if (extraMenu?.parentElement && signInLink.parentElement !== extraMenu.parentElement) {
    signInLink.classList.add("sign-in-relocated");
    extraMenu.parentElement.insertBefore(signInLink, extraMenu);
  }
}

export default {
  extends: VoidZeroTheme,
  Layout,
  enhanceApp(ctx) {
    ctx.app.provide(themeContextKey, planeThemeContext);
    VoidZeroTheme.enhanceApp(ctx);
    enhanceAppWithTabs(ctx.app);
    ctx.app.component("Card", Card);
    ctx.app.component("CardGroup", CardGroup);
    ctx.app.component("Tags", Tags);
  },
  setup() {
    if (typeof window === "undefined") return;

    const route = useRoute();

    const zoom = mediumZoom(".vp-doc img", {
      background: "rgba(0, 0, 0, 0.8)",
    });

    onMounted(() => {
      // Delay tab hash handling to ensure tabs are rendered
      setTimeout(() => {
        handleTabHash();
        setupTabHashUpdates();
        moveSignInToUtilityArea();
      }, 100);

      // Listen for hash changes
      window.addEventListener("hashchange", () => {
        nextTick(handleTabHash);
      });
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
          moveSignInToUtilityArea();
        });
      },
    );
  },
} satisfies Theme;
