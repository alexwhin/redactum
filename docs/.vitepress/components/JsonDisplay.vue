<template>
  <div class="json-container">
    <div class="json-header" v-if="title">
      <span class="json-title">{{ title }}</span>
      <button class="copy-button" @click="copyToClipboard" :class="{ copied }">
        <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
    </div>
    <pre class="json-content"><code>{{ formattedJson }}</code></pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: {
    type: [Object, Array],
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const copied = ref(false)

const formattedJson = computed(() => {
  return JSON.stringify(props.data, null, 2)
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedJson.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.json-container {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.json-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--vp-c-bg-elv);
  border-bottom: 1px solid var(--vp-c-divider);
}

.json-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.copy-button {
  background: transparent;
  border: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.copy-button:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.copy-button.copied {
  color: #10b981;
}

.json-content {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-family: 'Fira Code', 'SF Mono', Monaco, monospace;
  font-size: 13px;
  line-height: 1.6;
}

.json-content code {
  background: none;
  padding: 0;
  color: var(--vp-c-text-1);
}

/* Syntax highlighting for JSON */
.json-content :deep(.hljs-attr) {
  color: #41d1ff;
}

.json-content :deep(.hljs-string) {
  color: #98c379;
}

.json-content :deep(.hljs-number) {
  color: #d19a66;
}

.json-content :deep(.hljs-literal) {
  color: #56b6c2;
}
</style>