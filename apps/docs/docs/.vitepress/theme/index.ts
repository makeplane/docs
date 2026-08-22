/**
 * docs.plane.so theme = shared Plane docs theme (@plane/docs-theme, packages/theme)
 * + this site's branding.
 */
import { createPlaneTheme } from "@plane/docs-theme";
import "./site.css";

export default createPlaneTheme({
  brand: {
    logoOnLight: "https://media.docs.plane.so/logo/new-logo-white.png",
    logoOnDark: "https://media.docs.plane.so/logo/new-logo-dark.png",
    logoAlt: "Plane",
    menuTitle: "Plane Docs",
    footerBg: "https://media.docs.plane.so/logo/og-docs.webp",
    monoIcon: "https://media.docs.plane.so/logo/favicon-32x32.png",
  },
  notFound: {
    siteName: "the Plane docs",
    sibling: {
      name: "developers.plane.so",
      url: "https://developers.plane.so",
      covers: "the API, webhooks, the MCP server, or self-hosting",
    },
    help: { text: "Get help from the Plane team", link: "/support/get-help" },
  },
});
