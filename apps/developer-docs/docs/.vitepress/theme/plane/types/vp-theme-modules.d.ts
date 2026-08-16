/**
 * Explicit module declarations for VoidZero VitePress theme aliases.
 * Wildcard patterns are unreliable in Vetur / some IDE resolvers; list each import path.
 */
import type { DefineComponent } from "vue";

type VueModule = DefineComponent<object, object, unknown>;

declare module "@vp-default/VPNavBarSearch.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPNavBarMenuLink.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPNavBarMenuGroup.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPNavBarAppearance.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPSwitchAppearance.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPNavBarSocialLinks.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPSocialLinks.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPBadge.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPBackdrop.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPContent.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPFooter.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPLocalNav.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPSidebar.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-default/VPSkipLink.vue" {
  const component: VueModule;
  export default component;
}

declare module "@components/oss/TopBanner.vue" {
  const component: VueModule;
  export default component;
}

declare module "@vp-composables/langs" {
  export function useLangs(options?: { correspondingLink?: boolean }): {
    localeLinks: { link: string; text: string }[];
    currentLang: { label?: string };
  };
}

declare module "@vp-composables/data" {
  export function useData(): ReturnType<typeof import("vitepress").useData>;
}

declare module "@vp-composables/layout" {
  export const layoutInfoInjectionKey: symbol;
  export function registerWatchers(options: { closeSidebar: () => void }): void;
  export function useLayout(): { hasSidebar: import("vue").ComputedRef<boolean> };
}

declare module "@vp-composables/sidebar" {
  export function useSidebarControl(): {
    isOpen: import("vue").Ref<boolean>;
    open: () => void;
    close: () => void;
  };
}

declare module "@vp-support/utils" {
  export function normalizeLink(path: string): string;
}

declare module "@vp-support/search-config" {
  export function getSearchProvider(theme: unknown): "local" | "algolia" | undefined;
}
