<script setup>
import { ref } from "vue";

defineProps({
  name: String,
  type: String,
  required: Boolean,
});

const isExpanded = ref(true);
</script>

<template>
  <div class="api-param">
    <div class="param-row" @click="isExpanded = !isExpanded">
      <span class="expand-icon" :class="{ expanded: isExpanded }">
        <svg width="8" height="8" viewBox="0 0 8 8">
          <path
            d="M2 1L6 4L2 7"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <code class="param-name">{{ name }}</code>
      <span class="param-colon">:</span>
      <span v-if="required" class="param-required">required</span>
      <span v-else class="param-optional">optional</span>
      <span class="param-type">{{ type }}</span>
    </div>
    <div v-show="isExpanded" class="param-description">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.api-param {
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 0;
}

.dark .api-param {
  border-bottom-color: #2a2a2a;
}

.api-param:last-child {
  border-bottom: none;
}

.param-row {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 14px;
}

.param-row:hover {
  opacity: 0.8;
}

.expand-icon {
  color: #9ca3af;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.param-name {
  font-weight: 600;
  color: #1f2937;
  background: none;
  padding: 0;
}

.dark .param-name {
  color: #f3f4f6;
}

.param-colon {
  color: #9ca3af;
}

.param-optional {
  color: #9ca3af;
  font-size: 13px;
  font-style: italic;
}

.param-required {
  color: #ef4444;
  font-size: 13px;
}

.param-type {
  color: #6b7280;
  font-size: 13px;
}

.dark .param-type {
  color: #9ca3af;
}

.param-description {
  margin-top: 8px;
  margin-left: 22px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.6;
}

.dark .param-description {
  color: #9ca3af;
}

.param-description :deep(p) {
  margin: 0;
}

.param-description :deep(code) {
  font-size: 13px;
  background: #f3f4f6;
  padding: 1px 4px;
  border-radius: 3px;
}

.dark .param-description :deep(code) {
  background: #1f1f1f;
}
</style>
