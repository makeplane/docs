<script setup lang="ts">
import { computed, provide, useSlots } from "vue";
import VPBackdrop from "@vp-default/VPBackdrop.vue";
import VPContent from "@vp-default/VPContent.vue";
import VPFooter from "@vp-default/VPFooter.vue";
import VPLocalNav from "@vp-default/VPLocalNav.vue";
import PlaneHeader from "../components/PlaneHeader.vue";
import TopBanner from "@components/oss/TopBanner.vue";
import VPSidebar from "@vp-default/VPSidebar.vue";
import VPSkipLink from "@vp-default/VPSkipLink.vue";
import { useData } from "@vp-composables/data";
import { layoutInfoInjectionKey, registerWatchers, useLayout } from "@vp-composables/layout";
import { useSidebarControl } from "@vp-composables/sidebar";

const { isOpen: isSidebarOpen, open: openSidebar, close: closeSidebar } = useSidebarControl();

registerWatchers({ closeSidebar });

const { frontmatter } = useData();
const { hasSidebar } = useLayout();

const slots = useSlots();
const heroImageSlotExists = computed(() => !!slots["home-hero-image"]);

provide(layoutInfoInjectionKey, { heroImageSlotExists });
</script>

<template>
  <div v-if="frontmatter.layout !== false" class="Layout" :class="frontmatter.pageClass">
    <TopBanner />
    <slot name="layout-top" />
    <VPSkipLink />
    <VPBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
    <PlaneHeader>
      <template #nav-bar-title-before><slot name="nav-bar-title-before" /></template>
      <template #nav-bar-title-after><slot name="nav-bar-title-after" /></template>
    </PlaneHeader>

    <div class="flex flex-col min-h-screen">
      <!-- Content wrapper with borders -->
      <div class="content-wrapper flex-1" :class="{ 'has-sidebar': hasSidebar }">
        <VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />

        <VPSidebar :open="isSidebarOpen">
          <template #sidebar-nav-before>
            <slot name="sidebar-nav-before" />
          </template>
          <template #sidebar-nav-after>
            <slot name="sidebar-nav-after" />
          </template>
        </VPSidebar>

        <VPContent>
          <template #page-top>
            <slot name="page-top" />
          </template>
          <template #page-bottom>
            <slot name="page-bottom" />
          </template>

          <template #not-found>
            <slot name="not-found" />
          </template>
          <template #home-hero-before>
            <slot name="home-hero-before" />
          </template>
          <template #home-hero-info-before>
            <slot name="home-hero-info-before" />
          </template>
          <template #home-hero-info>
            <slot name="home-hero-info" />
          </template>
          <template #home-hero-info-after>
            <slot name="home-hero-info-after" />
          </template>
          <template #home-hero-actions-after>
            <slot name="home-hero-actions-after" />
          </template>
          <template #home-hero-image>
            <slot name="home-hero-image" />
          </template>
          <template #home-hero-after>
            <slot name="home-hero-after" />
          </template>
          <template #home-features-before>
            <slot name="home-features-before" />
          </template>
          <template #home-features-after>
            <slot name="home-features-after" />
          </template>

          <template #doc-footer-before>
            <slot name="doc-footer-before" />
          </template>
          <template #doc-before>
            <slot name="doc-before" />
          </template>
          <template #doc-after>
            <slot name="doc-after" />
          </template>
          <template #doc-top>
            <slot name="doc-top" />
          </template>
          <template #doc-bottom>
            <slot name="doc-bottom" />
          </template>

          <template #aside-top>
            <slot name="aside-top" />
          </template>
          <template #aside-bottom>
            <slot name="aside-bottom" />
          </template>
          <template #aside-outline-before>
            <slot name="aside-outline-before" />
          </template>
          <template #aside-outline-after>
            <slot name="aside-outline-after" />
          </template>
          <template #aside-ads-before>
            <slot name="aside-ads-before" />
          </template>
          <template #aside-ads-after>
            <slot name="aside-ads-after" />
          </template>
        </VPContent>
      </div>

      <VPFooter />
      <slot name="layout-bottom" />
    </div>
  </div>
  <Content v-else />
</template>

<style>
/* Add padding for fixed banner on lg+ screens only (non-scoped for :has() to work) */
@media (min-width: 1024px) {
  .Layout:has(.top-banner) {
    padding-top: var(--vp-banner-height, 0);
  }
}
</style>

<style scoped>
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  position: relative;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 768px) {
  .content-wrapper {
    max-width: calc(100vw - 2rem);
    border-left: 1px solid var(--docs-divider);
    border-right: 1px solid var(--docs-divider);
  }
}

@media (min-width: 90rem) {
  .content-wrapper {
    max-width: 90rem;
  }
}

@media (min-width: 1024px) {
  .content-wrapper.has-sidebar {
    display: grid;
    grid-template-columns: var(--vp-sidebar-width) minmax(0, 1fr);
    grid-template-rows: auto 1fr;
  }
}
</style>
