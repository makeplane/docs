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
});
