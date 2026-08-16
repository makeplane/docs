import { defineComponent, h } from "vue";
import Header from "../components/PlaneHeader.vue";
import { slotsToChildren } from "./slots";

export default defineComponent({
  name: "PlaneVoidzeroHeader",
  setup(_, { slots }) {
    return () => h(Header, null, slotsToChildren(slots));
  },
});
