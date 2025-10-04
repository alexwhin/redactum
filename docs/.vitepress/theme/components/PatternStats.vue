<script setup lang="ts">
import { computed } from "vue";
import statsData from "../../../../category-statistics.json";

interface CategoryStats {
  totalPatterns: number;
  totalCategories: number;
  patternsByCategory: Record<string, number>;
  lastUpdated: string;
}

const stats = statsData as CategoryStats;

const totalPatterns = computed(() => stats.totalPatterns);
const totalCategories = computed(() => stats.totalCategories);
</script>

<template>
  <p>
    Redactum includes <span class="highlight">{{ totalPatterns }}</span> built-in patterns across <span class="highlight">{{ totalCategories }}</span> categories for comprehensive detection of personal, financial, and technical sensitive data.
  </p>
</template>

<style scoped>
.highlight {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}
</style>
