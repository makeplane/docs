<script setup lang="ts">
interface Tag {
  name: string
  link?: string
  additionalClass?: string
}

defineProps<{ tags: Tag[] }>()
</script>

<template>
  <div class="tags">
    <template v-for="(tag, index) in tags" :key="index">
      <a
        v-if="tag && tag.name && tag.link"
        :href="tag.link"
        target="_blank"
        rel="noopener noreferrer"
        :class="['plantag', tag.additionalClass]"
      >
        {{ tag.name }}
      </a>
      <span
        v-else-if="tag && tag.name"
        :class="['plantag', tag.additionalClass]"
      >
        {{ tag.name }}
      </span>
    </template>
  </div>
</template>
