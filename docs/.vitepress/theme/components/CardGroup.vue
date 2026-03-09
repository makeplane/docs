<script setup>
defineProps({
  cols: {
    type: [Number, String],
    default: 2,
  },
});
</script>

<template>
  <div
    class="card-group"
    :class="{
      'card-group-2': cols == 2,
      'card-group-3': cols == 3,
      'card-group-4': cols == 4,
    }"
  >
    <slot />
  </div>
</template>
