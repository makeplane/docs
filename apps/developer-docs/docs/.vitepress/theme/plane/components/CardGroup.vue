<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  cols?: number | string;
  /** Alias for `cols` */
  columns?: number | string;
}>();

const columnCount = computed(() => {
  const n = Number(props.columns ?? props.cols);
  return n === 3 || n === 4 ? n : 2;
});
</script>

<template>
  <div class="card-group" :class="`card-group-${columnCount}`">
    <slot />
  </div>
</template>
