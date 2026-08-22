import type { Component, InjectionKey } from "vue";
import type { EnhanceAppContext } from "vitepress";

/** Per-site branding + hooks for the shared Plane docs theme. */
export interface PlaneThemeOptions {
  brand: {
    /** Logo shown on light backgrounds (dark mark). */
    logoOnLight: string;
    /** Logo shown on dark backgrounds (light mark). */
    logoOnDark: string;
    /** Alt text for the logo. Default: "Plane". */
    logoAlt?: string;
    /** Wordmark next to the logo in the mobile menu, e.g. "Plane Docs". */
    menuTitle: string;
    /** Footer background image (consumed by the VoidZero footer). */
    footerBg: string;
    /** Monochrome icon (consumed by the VoidZero top banner). */
    monoIcon: string;
  };
  /** Render the cookie-consent banner. Default: true. */
  cookieConsent?: boolean;
  /** Site-specific wording for the shared "page not found" content (404.md + not-found slot). */
  notFound?: {
    /** How this site is referred to in prose, e.g. "the Plane docs". */
    siteName: string;
    /** The other Plane docs site, for visitors who landed on the wrong one. */
    sibling?: {
      /** Display name, e.g. "developers.plane.so". */
      name: string;
      /** Origin without a trailing slash. */
      url: string;
      /** What it covers, completing "Looking for …?", e.g. "the API, webhooks, or self-hosting". */
      covers: string;
    };
    /** Where a person can ask for help. */
    help?: { text: string; link: string };
  };
  /** Extra globally-registered components (site-specific markdown components). */
  components?: Record<string, Component>;
  /** Extra `enhanceApp` work, run after the shared setup. */
  enhanceApp?: (ctx: EnhanceAppContext) => void;
  /** Extra client-side `setup()` work, run inside the shared theme's `setup()`. */
  setup?: () => void;
}

export const planeOptionsKey: InjectionKey<PlaneThemeOptions> = Symbol.for("plane-theme-options");
