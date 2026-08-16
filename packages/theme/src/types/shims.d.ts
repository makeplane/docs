/*
 * Ambient module shims (this file must stay a script: no top-level import/export).
 */

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

/** Deep imports from @voidzero-dev/vitepress-theme (the package does not ship .vue types) */
declare module "@voidzero-dev/vitepress-theme/src/components/vitepress-default/Layout.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "@voidzero-dev/vitepress-theme/src/components/oss/Header.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "@voidzero-dev/vitepress-theme/src/components/oss/TopBanner.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "@voidzero-dev/vitepress-theme/src/types/theme-context" {
  import type { InjectionKey } from "vue";
  export interface ThemeContext {
    logoDark: string;
    logoLight: string;
    logoAlt: string;
    footerBg: string;
    monoIcon: string;
  }
  export const themeContextKey: InjectionKey<ThemeContext>;
}
