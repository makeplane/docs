import { defineComponent, h } from "vue";
import Layout from "./doc-layout.vue";
import { slotsToChildren } from "./slots";

export default defineComponent({
  name: "PlaneVoidzeroDefaultLayout",
  setup(_, { slots }) {
    return () => h(Layout, null, slotsToChildren(slots));
  },
});
