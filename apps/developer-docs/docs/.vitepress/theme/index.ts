/**
 * developers.plane.so theme = shared Plane docs theme (./plane, byte-identical with
 * makeplane/docs) + developer-docs specifics (API reference components/layout).
 */
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import { createPlaneTheme } from "./plane";
import ApiParam from "./components/ApiParam.vue";
import CodePanel from "./components/CodePanel.vue";
import ResponsePanel from "./components/ResponsePanel.vue";
import "./site.css";

/** Toggle `.api-page` on `.VPDoc` for API reference pages (two-column layout, no aside). */
function updateApiPageClass() {
  if (typeof document === "undefined") return;
  const path = window.location.pathname;
  const isApiPage =
    path.includes("/api-reference/") && !path.endsWith("/introduction") && !path.endsWith("/introduction.html");
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
  setup() {
    const route = useRoute();
    onMounted(() => nextTick(updateApiPageClass));
    watch(
      () => route.path,
      () => nextTick(updateApiPageClass)
    );
  },
});
