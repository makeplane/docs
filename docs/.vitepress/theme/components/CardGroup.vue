<script setup lang="ts">
const props = withDefaults(defineProps<{ cols?: number }>(), { cols: 2 })
</script>

<template>
  <div class="card-group" :style="{ '--cols': props.cols }">
    <slot />
  </div>
</template>
