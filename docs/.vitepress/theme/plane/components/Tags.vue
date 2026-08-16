<script setup lang="ts">
defineProps<{
  label: string;
  href?: string;
}>();
</script>

<template>
  <a v-if="href" :href="href" class="plantag">{{ label }}</a>
  <span v-else class="plantag">{{ label }}</span>
</template>
