import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import Card from "./components/Card.vue";
import CardGroup from "./components/CardGroup.vue";
import Tags from "./components/Tags.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("Card", Card);
    app.component("CardGroup", CardGroup);
    app.component("Tags", Tags);
  },
} satisfies Theme;
