<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  languages: {
    type: Array,
    default: () => ["cURL", "Python", "JavaScript"],
  },
});

const activeTab = ref(props.languages[0]);
const copied = ref(false);

const copyCode = async () => {
  const activeContent = document.querySelector(".code-content:not(.is-hidden) pre code");
  if (activeContent) {
    await navigator.clipboard.writeText(activeContent.textContent);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  }
};
</script>

<template>
  <div class="code-panel">
    <div class="code-header">
      <div class="header-left">
        <span v-if="title" class="panel-title">{{ title }}</span>
        <div class="lang-tabs">
          <button
            v-for="lang in languages"
            :key="lang"
            class="lang-tab"
            :class="{ active: activeTab === lang }"
            @click="activeTab = lang"
          >
            {{ lang }}
          </button>
        </div>
      </div>
      <button class="copy-btn" @click="copyCode" title="Copy code">
        <svg
          v-if="!copied"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
    </div>
    <div class="code-body">
      <div v-for="lang in languages" :key="lang" class="code-content" :class="{ 'is-hidden': activeTab !== lang }">
        <slot :name="lang.toLowerCase().replace(/\s+/g, '')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-panel {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #fff;
  margin-bottom: 16px;
}

.dark .code-panel {
  background: #0f0f0f;
  border-color: #2a2a2a;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.dark .code-header {
  background: #1a1a1a;
  border-bottom-color: #2a2a2a;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.panel-title {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.dark .panel-title {
  color: #d1d5db;
}

.lang-tabs {
  display: flex;
  gap: 4px;
}

.lang-tab {
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}

.lang-tab:hover {
  color: #374151;
  background: #e5e7eb;
}

.dark .lang-tab:hover {
  color: #f3f4f6;
  background: #374151;
}

.lang-tab.active {
  color: #1f2937;
  background: #e5e7eb;
}

.dark .lang-tab.active {
  color: #fff;
  background: #374151;
}

.copy-btn {
  padding: 6px;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.copy-btn:hover {
  color: #374151;
  background: #e5e7eb;
}

.dark .copy-btn:hover {
  color: #f3f4f6;
  background: #374151;
}

.code-body {
  position: relative;
}

.code-content {
  display: block;
}

.code-content.is-hidden {
  display: none;
}

.code-content :deep(div[class*="language-"]) {
  margin: 0 !important;
  border-radius: 0 !important;
  border: none !important;
}

.code-content :deep(pre) {
  margin: 0 !important;
}
</style>
