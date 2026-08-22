/**
 * developers.plane.so theme = shared Plane docs theme (@plane/docs-theme, packages/theme)
 * + developer-docs specifics (API reference components/layout).
 */
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import { createPlaneTheme } from "@plane/docs-theme";
import ApiParam from "./components/ApiParam.vue";
import CodePanel from "./components/CodePanel.vue";
import ResponsePanel from "./components/ResponsePanel.vue";
import "./site.css";

/** Toggle `.api-page` on `.VPDoc` for API reference pages (two-column layout, no aside). */
function updateApiPageClass() {
  if (typeof document === "undefined") return;
  const path = window.location.pathname;
  const isApiPage =
    path.includes("/api-reference/") &&
    !path.endsWith("/introduction") &&
    !path.endsWith("/introduction.html");
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
  notFound: {
    siteName: "the Plane developer docs",
    sibling: {
      name: "docs.plane.so",
      url: "https://docs.plane.so",
      covers: "how to use Plane (workspaces, projects, work items, pages)",
    },
    help: { text: "Get help from the Plane team", link: "https://docs.plane.so/support/get-help" },
  },
  components: { ApiParam, CodePanel, ResponsePanel },
  setup() {
    const route = useRoute();
    onMounted(() => nextTick(updateApiPageClass));
    watch(
      () => route.path,
      () => nextTick(updateApiPageClass),
    );
  },
});
