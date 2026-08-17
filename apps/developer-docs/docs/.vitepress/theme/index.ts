/**
 * developers.plane.so theme = shared Plane docs theme (@plane/docs-theme, packages/theme)
 * + developer-docs specifics (API reference components/layout).
 */
import { h, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import { createPlaneTheme } from "@plane/docs-theme";
import ApiParam from "./components/ApiParam.vue";
import ApiVersionSwitcher from "./components/ApiVersionSwitcher.vue";
import CodePanel from "./components/CodePanel.vue";
import ResponsePanel from "./components/ResponsePanel.vue";
import "./site.css";

/**
 * Prose pages under `/api-reference/` (the introductions and the v2 concept
 * guides) keep the normal doc layout; only endpoint pages go wide.
 */
const API_PROSE_PAGES = [
  "introduction",
  "authentication",
  "pagination",
  "filtering-and-ordering",
  "expanding-relations",
  "sparse-fields",
  "errors",
  "work-item-type-modes",
  "migrating-from-v1",
];

/** Toggle `.api-page` on `.VPDoc` for API reference pages (two-column layout, no aside). */
function updateApiPageClass() {
  if (typeof document === "undefined") return;
  const path = window.location.pathname;
  const slug =
    path
      .replace(/\.html$/, "")
      .replace(/\/$/, "")
      .split("/")
      .pop() ?? "";
  const isApiPage = path.includes("/api-reference/") && !API_PROSE_PAGES.includes(slug);
  document.querySelector(".VPDoc")?.classList.toggle("api-page", isApiPage);
}

export default createPlaneTheme({
  brand: {
    logoOnLight: "/logo/dev-logo-watermark-light.png",
    logoOnDark: "/logo/dev-logo-watermark-dark.png",
    logoAlt: "Plane",
    menuTitle: "Plane Developers",
    footerBg: "https://media.docs.plane.so/logo/og-docs.webp",
    monoIcon: "/logo/favicon-32x32.png",
  },
  components: { ApiParam, CodePanel, ResponsePanel },
  layoutSlots: {
    // Renders above the sidebar nav; the component hides itself outside
    // /api-reference/. Switching version navigates to that version's entry page,
    // which swaps the whole sidebar tree via the path-prefix keys in config.mts.
    "sidebar-nav-before": () => h(ApiVersionSwitcher),
  },
  setup() {
    const route = useRoute();
    onMounted(() => nextTick(updateApiPageClass));
    watch(
      () => route.path,
      () => nextTick(updateApiPageClass),
    );
  },
});
