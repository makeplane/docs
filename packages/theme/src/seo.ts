/**
 * Build-time SEO helpers shared by both sites. Imported by the VitePress
 * configs as `@plane/docs-theme/seo`; nothing here ships to the browser.
 */
import type { HeadConfig, PageData } from "vitepress";

const PLANE_ORGANIZATION_ID = "https://plane.so/#organization";

/**
 * Plane as a schema.org Organization. Single source of truth so both sites
 * publish the same identity (name, logo, profiles, contact points).
 */
export const planeOrganization = {
  "@type": "Organization",
  "@id": PLANE_ORGANIZATION_ID,
  name: "Plane",
  url: "https://plane.so",
  logo: "https://media.docs.plane.so/logo/new-logo-white.png",
  sameAs: ["https://github.com/makeplane", "https://x.com/planepowers"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@plane.so",
      url: "https://docs.plane.so/support/get-help",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@plane.so",
      availableLanguage: "English",
    },
  ],
};

export interface SiteIdentity {
  /** Site name, e.g. "Plane Docs". */
  name: string;
  /** Origin without a trailing slash, e.g. "https://docs.plane.so". */
  url: string;
  /** One-sentence description of what the site covers. */
  description: string;
}

/**
 * `<script type="application/ld+json">` head entry describing the site
 * (WebSite) and its publisher (the Plane Organization). Add it to `head` so
 * every page carries it; agents and search engines read it from the homepage.
 */
export function siteJsonLd(site: SiteIdentity): HeadConfig {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      planeOrganization,
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": PLANE_ORGANIZATION_ID },
      },
    ],
  };
  // Nothing above contains "<", but escape anyway so a future edit can never
  // close the <script> element early.
  return ["script", { type: "application/ld+json" }, JSON.stringify(data).replace(/</g, "\\u003c")];
}

/**
 * `<link rel="canonical">` for a page, or undefined when the page's
 * frontmatter already sets one. Mirrors cleanUrls: `dir/page.md` →
 * `${origin}/dir/page`, `dir/index.md` → `${origin}/dir`, `index.md` →
 * `${origin}/`. Call from `transformPageData`.
 */
export function canonicalLink(origin: string, pageData: PageData): HeadConfig | undefined {
  const head = (pageData.frontmatter.head ?? []) as HeadConfig[];
  if (head.some(([tag, attrs]) => tag === "link" && attrs?.rel === "canonical")) return undefined;
  const path = pageData.relativePath.replace(/\.md$/, "").replace(/(^|\/)index$/, "");
  return ["link", { rel: "canonical", href: path ? `${origin}/${path}` : `${origin}/` }];
}
