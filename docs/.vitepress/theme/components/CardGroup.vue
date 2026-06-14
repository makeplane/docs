<script setup>
import { computed } from "vue";

const props = defineProps({
  cols: {
    type: [Number, String],
    default: 2,
  },
  /** Alias for `cols` (e.g. `<CardGroup columns="3">`) */
  columns: {
    type: [Number, String],
    default: undefined,
  },
});

const columnCount = computed(() => props.columns ?? props.cols);
</script>

<template>
  <div
    class="card-group"
    :class="{
      'card-group-2': columnCount == 2,
      'card-group-3': columnCount == 3,
      'card-group-4': columnCount == 4,
    }"
  >
    <slot />
  </div>
</template>
