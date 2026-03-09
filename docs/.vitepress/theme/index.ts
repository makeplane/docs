import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import mediumZoom from "medium-zoom";
import Card from "./components/Card.vue";
import CardGroup from "./components/CardGroup.vue";
import Tags from "./components/Tags.vue";
import "./style.css";

/**
 * Handles tab activation based on URL hash
 */
function handleTabHash() {
  if (typeof document === "undefined") return;

  const hash = window.location.hash.slice(1); // Remove the '#'
  if (!hash) return;

  const tabButtons = document.querySelectorAll('[role="tab"]');

  if (tabButtons.length === 0) {
    return;
  }

  tabButtons.forEach((button) => {
    const labelText = button.textContent?.trim().toLowerCase().replace(/\s+/g, "-");

    if (labelText === hash) {
      const element = button as HTMLElement;

      // Dispatch a proper mouse event
      const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      element.dispatchEvent(clickEvent);
      element.click();
      element.focus();
    }
  });
}

/**
 * Adds click listeners to tabs to update URL hash
 */
function setupTabHashUpdates() {
  if (typeof document === "undefined") return;

  const tabButtons = document.querySelectorAll('[role="tab"]');

  tabButtons.forEach((button) => {
    const element = button as HTMLElement;

    // Remove existing listener if any
    element.removeEventListener("click", updateHashOnTabClick);

    // Add new listener
    element.addEventListener("click", updateHashOnTabClick);
  });
}

function updateHashOnTabClick(event: Event) {
  const button = event.currentTarget as HTMLElement;
  const labelText = button.textContent?.trim().toLowerCase().replace(/\s+/g, "-");

  if (labelText) {
    // Update URL hash without triggering scroll
    history.replaceState(null, "", `#${labelText}`);
  }
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
    app.component("Card", Card);
    app.component("CardGroup", CardGroup);
    app.component("Tags", Tags);
  },
  setup() {
    if (typeof window === "undefined") return;

    const route = useRoute();

    const zoom = mediumZoom(".vp-doc img", {
      background: "rgba(0, 0, 0, 0.8)",
    });

    onMounted(() => {
      // Delay tab hash handling to ensure tabs are rendered
      setTimeout(() => {
        handleTabHash();
        setupTabHashUpdates();
      }, 100);

      // Listen for hash changes
      window.addEventListener("hashchange", () => {
        nextTick(handleTabHash);
      });
    });

    // Watch for route changes
    watch(
      () => route.path,
      () => {
        nextTick(() => {
          zoom.detach();
          zoom.attach(":not(a) > img:not(.VPImage)");
          handleTabHash();
          setupTabHashUpdates();
        });
      }
    );
  },
} satisfies Theme;
