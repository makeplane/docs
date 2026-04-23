<script setup lang="ts">
import { computed, useSlots } from "vue";
import VoidZeroTheme from "@voidzero-dev/vitepress-theme";

const BaseLayout = VoidZeroTheme.Layout;
const slots = useSlots();
const forwardSlotNames = computed(() => Object.keys(slots) as string[]);
</script>

<template>
  <BaseLayout>
    <template v-for="name in forwardSlotNames" :key="name" #[name]="data">
      <slot :name="name" v-bind="data || {}" />
    </template>
  </BaseLayout>
</template>
