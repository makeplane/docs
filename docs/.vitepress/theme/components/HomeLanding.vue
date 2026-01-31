<script setup lang="ts">
import {
  Building2,
  LayoutDashboard,
  Inbox,
  BarChart3,
  Sparkles,
  Import,
  Cloud,
  Server,
  Code2,
  MessageCircle,
  Newspaper,
  ArrowRight,
} from "lucide-vue-next";

interface LinkItem {
  icon: any;
  title: string;
  description: string;
  href: string;
  cta?: string;
}

const topics: LinkItem[] = [
  {
    icon: Building2,
    title: "Workspace Management",
    description: "Set up and manage workspaces, members, roles, and permissions.",
    href: "/core-concepts/workspaces/overview",
  },
  {
    icon: LayoutDashboard,
    title: "Views & Layouts",
    description: "Customize how you see work with layouts, filters, and saved views.",
    href: "/core-concepts/issues/layouts",
  },
  {
    icon: Inbox,
    title: "Intake & Customers",
    description: "Collect requests from customers through intake forms and email.",
    href: "/intake/overview",
  },
  {
    icon: BarChart3,
    title: "Analytics & Dashboards",
    description: "Track progress and gain insights with analytics and custom dashboards.",
    href: "/core-concepts/analytics",
  },
  {
    icon: Sparkles,
    title: "AI Features",
    description: "Use Pi, Plane's AI assistant, to search, summarize, and automate work.",
    href: "/ai/pi-chat",
  },
  {
    icon: Import,
    title: "Import Data",
    description: "Migrate from Jira, Linear, Asana, ClickUp, Notion, and more.",
    href: "/importers/overview",
  },
];

const resources: LinkItem[] = [
  {
    icon: Code2,
    title: "Developer Docs",
    description: "API reference, webhooks, SDKs, and self-hosting guides.",
    href: "https://developers.plane.so",
  },
  {
    icon: MessageCircle,
    title: "Community",
    description: "Join the Plane community on Discord for help and discussions.",
    href: "https://discord.com/invite/A92xrEGCge",
  },
  {
    icon: Newspaper,
    title: "Changelog",
    description: "Stay up to date with the latest features and improvements.",
    href: "https://plane.so/changelog",
  },
];

function isExternal(href: string) {
  return href.startsWith("http");
}
</script>

<template>
  <div class="px-6 sm:px-12 min-[960px]:px-16 pt-12 pb-24">
    <div class="max-w-[1152px] mx-auto">
      <!-- Explore by Topic -->
      <h2 class="!text-2xl !font-[640] !mb-6 !mt-0 !border-none !pt-0 tracking-tight text-[var(--vp-c-text-1)]">Explore by Topic</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 min-[960px]:grid-cols-3 gap-4">
        <a
          v-for="topic in topics"
          :key="topic.title"
          :href="topic.href"
          class="group flex items-start gap-4 p-5 rounded-xl border border-[var(--vp-c-divider)] !no-underline !text-inherit transition-all duration-200 hover:border-[var(--vp-c-brand-1)] hover:-translate-y-0.5"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-lg bg-[var(--vp-c-default-soft)] flex items-center justify-center text-[var(--vp-c-brand-1)]"
          >
            <component :is="topic.icon" :size="20" :stroke-width="1.75" />
          </div>
          <div class="min-w-0">
            <div class="font-[600] text-[15px] text-[var(--vp-c-text-1)] flex items-center gap-1.5">
              {{ topic.title }}
              <ArrowRight
                :size="14"
                class="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              />
            </div>
            <div class="text-sm text-[var(--vp-c-text-2)] mt-1 leading-relaxed">
              {{ topic.description }}
            </div>
          </div>
        </a>
      </div>

      <!-- Get Plane -->
      <h2 class="!text-2xl !font-[640] !mt-14 !mb-6 !border-none !pt-0 tracking-tight text-[var(--vp-c-text-1)]">Get Plane</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
        <!-- Plane Cloud -->
        <a
          href="https://app.plane.so/sign-up"
          target="_blank"
          rel="noopener noreferrer"
          class="group p-6 rounded-xl bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] !no-underline !text-inherit transition-all duration-200 hover:border-[var(--vp-c-brand-1)] hover:-translate-y-0.5"
        >
          <div class="w-12 h-12 rounded-xl bg-[var(--vp-c-brand-1)] flex items-center justify-center mb-4">
            <Cloud :size="24" class="text-white" :stroke-width="1.75" />
          </div>
          <h3 class="!text-lg !font-[600] text-[var(--vp-c-text-1)] !mb-1.5 !mt-0">Plane Cloud</h3>
          <p class="text-sm text-[var(--vp-c-text-2)] leading-relaxed mb-4">
            Sign up for a free cloud account — the quickest way to start using Plane.
          </p>
          <span class="text-sm font-[560] text-[var(--vp-c-brand-1)] inline-flex items-center gap-1">
            Sign up free
            <ArrowRight :size="14" class="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </a>

        <!-- Self-host -->
        <a
          href="https://developers.plane.so/self-hosting/overview"
          target="_blank"
          rel="noopener noreferrer"
          class="group p-6 rounded-xl bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)] !no-underline !text-inherit transition-all duration-200 hover:border-[var(--vp-c-brand-1)] hover:-translate-y-0.5"
        >
          <div
            class="w-12 h-12 rounded-xl bg-[var(--vp-c-default-soft)] border border-[var(--vp-c-divider)] flex items-center justify-center mb-4"
          >
            <Server :size="24" class="text-[var(--vp-c-text-1)]" :stroke-width="1.75" />
          </div>
          <h3 class="!text-lg !font-[600] text-[var(--vp-c-text-1)] !mb-1.5 !mt-0">Self-host Plane</h3>
          <p class="text-sm text-[var(--vp-c-text-2)] leading-relaxed mb-4">
            Install Plane on your own infrastructure for full control over your data.
          </p>
          <span class="text-sm font-[560] text-[var(--vp-c-brand-1)] inline-flex items-center gap-1">
            Learn more
            <ArrowRight :size="14" class="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </a>
      </div>

      <!-- Resources -->
      <h2 class="!text-2xl !font-[640] !mt-14 !mb-6 !border-none !pt-0 tracking-tight text-[var(--vp-c-text-1)]">Resources</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          v-for="resource in resources"
          :key="resource.title"
          :href="resource.href"
          :target="isExternal(resource.href) ? '_blank' : undefined"
          :rel="isExternal(resource.href) ? 'noopener noreferrer' : undefined"
          class="group flex items-start gap-4 p-5 rounded-xl border border-[var(--vp-c-divider)] !no-underline !text-inherit transition-all duration-200 hover:border-[var(--vp-c-brand-1)] hover:-translate-y-0.5"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-lg bg-[var(--vp-c-default-soft)] flex items-center justify-center text-[var(--vp-c-brand-1)]"
          >
            <component :is="resource.icon" :size="20" :stroke-width="1.75" />
          </div>
          <div class="min-w-0">
            <div class="font-[600] text-[15px] text-[var(--vp-c-text-1)] flex items-center gap-1.5">
              {{ resource.title }}
              <ArrowRight
                :size="14"
                class="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              />
            </div>
            <div class="text-sm text-[var(--vp-c-text-2)] mt-1 leading-relaxed">
              {{ resource.description }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
