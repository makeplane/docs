<script setup lang="ts">
import { computed, useSlots } from "vue";
import * as LucideIcons from "lucide-vue-next";
import { cardBrandIcons } from "./card-brand-icons";

const props = defineProps<{
  title?: string;
  /** Brand icon key (see card-brand-icons.ts) or a Lucide icon name in kebab-case */
  icon?: string;
  /** Doc path or full URL */
  href?: string;
  /** Alias for `href` */
  link?: string;
  /** Body text; when omitted the default slot is rendered instead */
  description?: string;
  /** Bottom call-to-action label (rendered with an arrow) */
  cta?: string;
  /** Alias for `cta` (`link-text` in markdown) */
  linkText?: string;
}>();

const slots = useSlots();

const resolvedHref = computed(() => (props.link ?? props.href ?? "").trim());
const hasDestination = computed(() => resolvedHref.value.length > 0);
const ctaText = computed(() => props.cta ?? props.linkText);
const hasDescription = computed(() => Boolean(props.description) || Boolean(slots.default));

const brandIcon = computed(() => (props.icon ? cardBrandIcons[props.icon] : undefined));

const LucideIcon = computed(() => {
  if (!props.icon || brandIcon.value) return null;
  const name = props.icon
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const icons = LucideIcons as unknown as Record<string, unknown>;
  return (icons[name] ?? LucideIcons.CircleHelp) as typeof LucideIcons.CircleHelp;
});
</script>

<template>
  <component
    :is="hasDestination ? 'a' : 'div'"
    :href="hasDestination ? resolvedHref : undefined"
    class="card-link no-icon"
    :class="{ 'card-link--static': !hasDestination }"
  >
    <div class="card-head">
      <div v-if="icon" class="card-icon" aria-hidden="true">
        <span class="card-icon__surface">
          <span v-if="brandIcon" class="card-icon__custom" v-html="brandIcon" />
          <component
            :is="LucideIcon"
            v-else
            class="card-icon__lucide"
            :size="20"
            :stroke-width="1.75"
          />
        </span>
      </div>
      <h3 v-if="title" class="card-title">{{ title }}</h3>
    </div>
    <div v-if="hasDescription" class="card-description">
      <template v-if="description">{{ description }}</template>
      <slot v-else />
    </div>
    <span v-if="ctaText" class="card-cta">
      {{ ctaText }}
      <svg class="card-cta__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </component>
</template>
