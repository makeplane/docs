<script setup lang="ts">
import { computed, useSlots } from "vue";
import VoidZeroTheme from "@voidzero-dev/vitepress-theme";
import CopyPageMenu from "./components/CopyPageMenu.vue";

const BaseLayout = VoidZeroTheme.Layout;
const slots = useSlots();
// `doc-before` is rendered explicitly below (it also hosts the "Copy page" control),
// so keep it out of the dynamic forwarding loop.
const forwardSlotNames = computed(() =>
  (Object.keys(slots) as string[]).filter((name) => name !== "doc-before"),
);
</script>

<template>
  <BaseLayout>
    <template v-for="name in forwardSlotNames" :key="name" #[name]="data">
      <slot :name="name" v-bind="data || {}" />
    </template>
    <template #doc-before>
      <slot name="doc-before" />
      <CopyPageMenu />
    </template>
  </BaseLayout>
</template>
