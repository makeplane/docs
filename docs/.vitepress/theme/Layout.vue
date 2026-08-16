<script setup lang="ts">
import { computed, useSlots } from "vue";
import { useData, Content } from "vitepress";
import VPDefaultLayout from "./voidzero/default-layout";
import OSSHeader from "./voidzero/header";
import TopBanner from "./voidzero/top-banner";
import CopyPageMenu from "./components/CopyPageMenu.vue";

const { frontmatter, site } = useData();
const slots = useSlots();
// `doc-before` is rendered explicitly below (it also hosts the "Copy page" control),
// so keep it out of the dynamic forwarding loop.
const forwardSlotNames = computed(() => (Object.keys(slots) as string[]).filter((name) => name !== "doc-before"));

const variant = computed(() => (site.value.themeConfig as { variant?: string }).variant ?? "voidzero");

// Use the standard doc layout (with sidebar) for doc, page, and home layouts
const useDocLayout = computed(() => {
  const layout = frontmatter.value.layout;
  if (!layout) return true;
  return layout === "doc" || layout === "page" || layout === "home";
});
</script>

<template>
  <div v-if="useDocLayout" class="docs-layout" :data-theme="frontmatter.theme" :data-variant="variant">
    <VPDefaultLayout>
      <template v-for="name in forwardSlotNames" :key="name" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
      <template #doc-before>
        <slot name="doc-before" />
        <CopyPageMenu />
      </template>
    </VPDefaultLayout>
  </div>
  <div v-else class="marketing-layout" :data-theme="frontmatter.theme" :data-variant="variant">
    <TopBanner />
    <OSSHeader>
      <template #nav-bar-title-before><slot name="nav-bar-title-before" /></template>
      <template #nav-bar-title-after><slot name="nav-bar-title-after" /></template>
    </OSSHeader>
    <Content />
  </div>
</template>

<style scoped>
.docs-layout,
.marketing-layout {
  min-height: 100vh;
}
</style>
