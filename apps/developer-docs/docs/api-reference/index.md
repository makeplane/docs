---
title: API Reference
description: Plane REST API reference. Redirects to the current API version, v2.
keywords: plane api, rest api reference, plane api v2
aside: false
outline: false
---

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vitepress";

const TARGET = "/api-reference/v2/introduction";
const router = useRouter();

// Production redirects are handled by vercel.json; this covers `pnpm dev`,
// `pnpm preview`, and any host that serves the static build without them.
onMounted(() => {
  router.go(TARGET);
});
</script>

# API Reference

Redirecting to the current API version…

If you are not redirected automatically, continue to the [Plane API v2 reference](/api-reference/v2/introduction).

Looking for the previous version? See the [v1 reference](/api-reference/v1/introduction).
