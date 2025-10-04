<template>
  <div class="redaction-output">
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-content">
      <div v-if="activeTab === 'output'" class="output-display">
        <div class="output-label">OUTPUT</div>
        <div class="output-text" v-html="formattedOutput"></div>
      </div>
      <div v-else-if="activeTab === 'response'" class="response-display">
        <div class="response-label">RESPONSE</div>
        <pre class="response-json"><code>{{ formattedJson }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  output: {
    type: String,
    required: true
  },
  response: {
    type: Object,
    required: true
  }
});

const activeTab = ref("output");

const tabs = [
  { id: "output", label: "OUTPUT" },
  { id: "response", label: "Response Object" }
];

const formattedOutput = computed(() => {
  return props.output.replace(/\[([^\]]+)\]/g, '<span class="redacted">[$1]</span>');
});

const formattedJson = computed(() => {
  return JSON.stringify(props.response, null, 2);
});
</script>

<style scoped>
.redaction-output {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.tabs {
  display: flex;
  gap: 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px 8px 0 0;
  padding: 4px 8px 0;
  min-height: 32px;
}

.tab {
  background: transparent;
  border: none;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.25s;
  padding: 1px 15px 5px;
  border-bottom: 2px solid transparent;
}

.tab:hover {
  color: var(--vp-c-text-1);
}

.tab.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.tab-content {
  position: relative;
  background: var(--vp-c-bg-soft);
  border-radius: 0 0 8px 8px;
}

.output-display,
.response-display {
  padding: 16px 20px;
}

.output-label,
.response-label {
  color: var(--vp-c-brand-1);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  margin-bottom: 12px;
}

.output-text {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  word-wrap: break-word;
  white-space: pre-wrap;
}

.output-text :deep(.redacted) {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.response-display {
  padding-bottom: 20px;
}

.response-json {
  margin: 0;
  padding: 0;
  overflow-x: auto;
  font-family: "Fira Code", "SF Mono", Monaco, "Inconsolata", "Roboto Mono", monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  white-space: pre;
  word-wrap: normal;
}

.response-json code {
  background: none;
  padding: 0;
  color: var(--vp-c-text-1);
}
</style>
