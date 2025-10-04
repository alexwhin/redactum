<script setup lang="ts">
defineProps<{
  emoji: string;
  title: string;
}>();
</script>

<template>
  <div class="emoji-title">
    <span class="emoji">{{ emoji }}</span>
    <span class="title">{{ title }}</span>
  </div>
</template>

<style scoped>
.emoji-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.emoji {
  display: inline-block;
  line-height: 1;
}

.title {
  display: inline-block;
}
</style>
