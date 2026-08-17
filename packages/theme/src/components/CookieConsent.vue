<script setup lang="ts">
import { ref, onMounted } from "vue";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const STORAGE_KEY = "plane-docs-cookie-consent";
const showBanner = ref(false);

function getConsent(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function grantConsent() {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }
}

function accept() {
  try {
    localStorage.setItem(STORAGE_KEY, "granted");
  } catch {}
  grantConsent();
  showBanner.value = false;
}

function decline() {
  try {
    localStorage.setItem(STORAGE_KEY, "denied");
  } catch {}
  showBanner.value = false;
}

onMounted(() => {
  const consent = getConsent();
  if (consent === "granted") {
    grantConsent();
  } else if (consent !== "denied") {
    showBanner.value = true;
  }
});
</script>

<template>
  <Transition name="consent">
    <div v-if="showBanner" class="consent-banner">
      <p class="consent-text">
        We use cookies and analytics to improve your experience. You can accept or decline
        non-essential cookies.
      </p>
      <div class="consent-actions">
        <button class="consent-btn consent-btn-decline" @click="decline">Decline</button>
        <button class="consent-btn consent-btn-accept" @click="accept">Accept</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.consent-banner {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 680px;
  width: calc(100% - 32px);
  padding: 14px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
}

.consent-text {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  flex: 1;
}

.consent-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.consent-btn {
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  white-space: nowrap;
  transition: background 0.15s ease;
}

.consent-btn-decline {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.consent-btn-decline:hover {
  background: var(--vp-c-bg-mute);
}

.consent-btn-accept {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.consent-btn-accept:hover {
  opacity: 0.9;
}

@media (max-width: 540px) {
  .consent-banner {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .consent-actions {
    justify-content: flex-end;
  }
}

/* Transition */
.consent-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.consent-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.consent-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
.consent-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
