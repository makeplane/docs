import { defineComponent, h } from "vue";
import Banner from "@voidzero-dev/vitepress-theme/src/components/oss/TopBanner.vue";

export default defineComponent({
  name: "PlaneVoidzeroTopBanner",
  setup() {
    return () => h(Banner);
  },
});
