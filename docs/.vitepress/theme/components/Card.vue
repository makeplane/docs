<script setup>
defineProps({
  title: String,
  icon: String,
  href: String,
});
</script>

<template>
  <component :is="href ? 'a' : 'div'" :href="href" class="card-link">
    <div class="card-icon">
      <slot name="icon" />
    </div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">
      <slot />
    </p>
  </component>
</template>
