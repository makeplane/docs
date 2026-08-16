import type { Component } from "vue";
import type { Theme } from "vitepress";

export {
  themeContextKey,
  type ThemeContext,
} from "@voidzero-dev/vitepress-theme/src/types/theme-context";

export const VPHomeHero = {} as Component;
export const VPHomeFeatures = {} as Component;

declare const VoidZeroTheme: Theme;
export { VoidZeroTheme };
export default VoidZeroTheme;
