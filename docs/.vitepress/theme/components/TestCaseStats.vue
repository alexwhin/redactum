<script setup lang="ts">
import { computed } from "vue";
import statsData from "../../../../test-case-statistics.json";

interface TestCaseStats {
  totalTestCases: number;
  totalCategories: number;
  lastUpdated: string;
}

const stats = statsData as TestCaseStats;

const totalTestCases = computed(() => stats.totalTestCases);
const totalCategories = computed(() => stats.totalCategories);
</script>

<template>
  <p>
    Auto-generated from the project's test suite, this page shows <span class="highlight">{{ totalTestCases }}</span> real-world test cases that validate each policy pattern.
  </p>
</template>
