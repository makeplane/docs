/*
 * VitePress config augmentations used by the shared theme (module file on purpose).
 */
import type {} from "vitepress";

declare module "vitepress" {
  namespace DefaultTheme {
    interface Config {
      /** VoidZero theme variant (both Plane sites use "voidzero"). */
      variant?: "voidzero" | "viteplus" | "vite" | "vitest" | "rolldown" | "oxc";
    }
    interface NavItemWithLink {
      /**
       * Render this nav item as a header button instead of a nav link:
       * "primary" = filled (Sign in), "secondary" = outlined (link to the sibling docs site).
       */
      planeButton?: "primary" | "secondary";
    }
  }
}
