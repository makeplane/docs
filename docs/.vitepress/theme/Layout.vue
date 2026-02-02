<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import HomeLanding from "./components/HomeLanding.vue";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
</script>

<template>
  <Layout>
    <template #home-features-after>
      <HomeLanding v-if="frontmatter.layout === 'home'" />
    </template>
  </Layout>
</template>
