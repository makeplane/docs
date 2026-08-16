/**
 * Plane docs theme — shared between makeplane/docs and makeplane/developer-docs.
 *
 * `docs/.vitepress/theme/plane/` is byte-identical in both repos; each site's
 * `theme/index.ts` is a thin `createPlaneTheme({...})` call. Edit here in one repo,
 * copy to the other, and run `pnpm check:theme-sync`.
 */
import type { Theme } from "vitepress";
import { useData, useRoute } from "vitepress";
import { h, nextTick, onMounted, onUnmounted, watch } from "vue";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import mediumZoom from "medium-zoom";
import { themeContextKey } from "@voidzero-dev/vitepress-theme";
import VPBadge from "@vp-default/VPBadge.vue";

import "./css/index.css";

import PlaneLayout from "./layout/Layout.vue";
import Card from "./components/Card.vue";
import CardGroup from "./components/CardGroup.vue";
import Tags from "./components/Tags.vue";
import CookieConsent from "./components/CookieConsent.vue";
import { planeOptionsKey, type PlaneThemeOptions } from "./options";

export type { PlaneThemeOptions } from "./options";
export { planeOptionsKey } from "./options";
export { Card, CardGroup, Tags, CookieConsent, PlaneLayout };

/* ---------------------------------------------------------------------------
 * Client-side helpers
 * ------------------------------------------------------------------------- */

/** Mirror `html.dark` onto the header shell (`data-theme`), which is SSR-rendered light. */
function syncHeaderTheme() {
  if (typeof document === "undefined") return;
  const isDark = document.documentElement.classList.contains("dark");
  document.querySelectorAll("header.plane-header, header.wrapper").forEach((header) => {
    if (isDark) header.setAttribute("data-theme", "dark");
    else header.removeAttribute("data-theme");
  });
}

/** Deep links to tabs (`vitepress-plugin-tabs`): `#label` activates the matching tab. */
function handleTabHash() {
  if (typeof document === "undefined") return;
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  document.querySelectorAll<HTMLElement>('[role="tab"]').forEach((button) => {
    const labelText = button.textContent?.trim().toLowerCase().replace(/\s+/g, "-");
    if (labelText === hash) {
      button.dispatchEvent(
        new MouseEvent("click", { view: window, bubbles: true, cancelable: true }),
      );
      button.click();
      button.focus();
    }
  });
}

function updateHashOnTabClick(event: Event) {
  const button = event.currentTarget as HTMLElement;
  const labelText = button.textContent?.trim().toLowerCase().replace(/\s+/g, "-");
  if (labelText) history.replaceState(null, "", `#${labelText}`);
}

function setupTabHashUpdates() {
  if (typeof document === "undefined") return;
  document.querySelectorAll<HTMLElement>('[role="tab"]').forEach((button) => {
    button.removeEventListener("click", updateHashOnTabClick);
    button.addEventListener("click", updateHashOnTabClick);
  });
}

/* ---------------------------------------------------------------------------
 * Theme factory
 * ------------------------------------------------------------------------- */

export function createPlaneTheme(options: PlaneThemeOptions): Theme {
  const cookieConsent = options.cookieConsent ?? true;

  return {
    Layout() {
      return h(PlaneLayout, null, cookieConsent ? { "layout-bottom": () => h(CookieConsent) } : {});
    },

    enhanceApp(ctx) {
      const { app, router, siteData } = ctx;

      // What VoidZeroTheme.enhanceApp does, minus its "default to dark when the visitor
      // has no stored preference" behaviour — both sites follow the system setting.
      const variant = siteData.value.themeConfig?.variant || "voidzero";
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-variant", variant);
        watch(
          () => router.route.data.frontmatter?.theme,
          (theme) => {
            if (theme) document.documentElement.setAttribute("data-theme", theme);
            else document.documentElement.removeAttribute("data-theme");
          },
          { immediate: true },
        );
      }
      app.component("Badge", VPBadge);

      app.provide(themeContextKey, {
        /* VoidZero naming: logoDark = dark mark (light bg), logoLight = light mark (dark bg) */
        logoDark: options.brand.logoOnLight,
        logoLight: options.brand.logoOnDark,
        logoAlt: options.brand.logoAlt ?? "Plane",
        footerBg: options.brand.footerBg,
        monoIcon: options.brand.monoIcon,
      });
      app.provide(planeOptionsKey, options);

      enhanceAppWithTabs(app);

      app.component("Card", Card);
      app.component("CardGroup", CardGroup);
      app.component("Tags", Tags);
      for (const [name, component] of Object.entries(options.components ?? {})) {
        app.component(name, component);
      }

      options.enhanceApp?.(ctx);
    },

    setup() {
      if (typeof window === "undefined") return;

      const route = useRoute();
      const { isDark } = useData();
      let zoom: ReturnType<typeof mediumZoom> | null = null;
      let htmlClassObserver: MutationObserver | null = null;

      // Keep `html.dark` in lock-step with VitePress' `isDark` (VitePress' inline
      // check-dark-mode script only ever *adds* the class).
      watch(
        isDark,
        (dark) => {
          document.documentElement.classList.toggle("dark", dark);
          syncHeaderTheme();
        },
        { immediate: true },
      );

      const initZoom = () => {
        zoom?.detach();
        zoom = mediumZoom(".vp-doc :not(a) > img:not(.VPImage)", {
          background: "rgba(0, 0, 0, 0.8)",
        });
      };

      const scheduleHeaderSync = () => {
        nextTick(() => {
          syncHeaderTheme();
          requestAnimationFrame(syncHeaderTheme);
        });
      };

      onMounted(() => {
        nextTick(() => {
          initZoom();
          scheduleHeaderSync();
        });

        setTimeout(() => {
          handleTabHash();
          setupTabHashUpdates();
          syncHeaderTheme();
        }, 100);

        window.addEventListener("hashchange", () => nextTick(handleTabHash));

        htmlClassObserver = new MutationObserver(syncHeaderTheme);
        htmlClassObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
      });

      onUnmounted(() => {
        htmlClassObserver?.disconnect();
        zoom?.detach();
      });

      watch(
        () => route.path,
        () => {
          nextTick(() => {
            initZoom();
            handleTabHash();
            setupTabHashUpdates();
            scheduleHeaderSync();
          });
        },
      );

      options.setup?.();
    },
  };
}
