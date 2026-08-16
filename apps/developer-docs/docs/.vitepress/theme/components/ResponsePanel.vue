<script setup>
import { ref } from "vue";

const props = defineProps({
  status: {
    type: [String, Number],
    default: "200",
  },
});

const copied = ref(false);

const copyCode = async (event) => {
  const panel = event.target.closest(".response-panel");
  const codeBlock = panel?.querySelector("pre code");
  if (codeBlock) {
    await navigator.clipboard.writeText(codeBlock.textContent);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  }
};

const statusClass = () => {
  const code = parseInt(props.status);
  if (code >= 200 && code < 300) return "status-success";
  if (code >= 400 && code < 500) return "status-warning";
  if (code >= 500) return "status-error";
  return "";
};
</script>

<template>
  <div class="response-panel">
    <div class="response-header">
      <div class="header-left">
        <span class="response-label">Response</span>
        <span class="status-code" :class="statusClass()">{{ status }}</span>
      </div>
      <button class="copy-btn" @click="copyCode" title="Copy response">
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
    <div class="response-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.response-panel {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #fff;
  margin-bottom: 16px;
}

.dark .response-panel {
  background: #0f0f0f;
  border-color: #2a2a2a;
}

.response-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.dark .response-header {
  background: #1a1a1a;
  border-bottom-color: #2a2a2a;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.response-label {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.dark .response-label {
  color: #d1d5db;
}

.status-code {
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 13px;
  font-weight: 600;
}

.status-success {
  color: #22c55e;
}

.status-warning {
  color: #f59e0b;
}

.status-error {
  color: #ef4444;
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

.response-body :deep(div[class*="language-"]) {
  margin: 0 !important;
  border-radius: 0 !important;
  border: none !important;
}

.response-body :deep(pre) {
  margin: 0 !important;
}
</style>
