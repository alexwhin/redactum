<template>
  <div class="redaction-demo">
    <div class="demo-container">
      <div class="demo-label">Before</div>
      <div class="demo-content before">
        <div class="line" v-for="(line, index) in displayLines" :key="index">
          <span
            v-for="(part, pIndex) in line.parts"
            :key="pIndex"
            :class="{ 'sensitive': part.sensitive, 'redacting': part.redacting }"
          >
            {{ part.redacting ? part.redacted : part.text }}
          </span>
        </div>
      </div>

      <div class="arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="demo-label">After</div>
      <div class="demo-content after">
        <div class="line" v-for="(line, index) in displayLines" :key="index">
          <span
            v-for="(part, pIndex) in line.parts"
            :key="pIndex"
            :class="{ 'redacted': part.sensitive && currentStep >= part.step }"
          >
            {{ (part.sensitive && currentStep >= part.step) ? part.redacted : part.text }}
          </span>
        </div>
      </div>
    </div>

    <div class="demo-stats">
      <div class="stat">
        <span class="stat-value">{{ redactedCount }}</span>
        <span class="stat-label">items redacted</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ Math.round(progress * 100) }}%</span>
        <span class="stat-label">complete</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const currentStep = ref(0);
const maxSteps = 5;

const lines = [
  {
    parts: [
      { text: 'Email: ', sensitive: false },
      { text: 'john@example.com', sensitive: true, redacted: '[EMAIL]', step: 1 },
    ]
  },
  {
    parts: [
      { text: 'SSN: ', sensitive: false },
      { text: '123-45-6789', sensitive: true, redacted: '[SSN]', step: 2 },
    ]
  },
  {
    parts: [
      { text: 'API Key: ', sensitive: false },
      { text: 'sk-1234567890abcdef', sensitive: true, redacted: '[API_KEY]', step: 3 },
    ]
  },
  {
    parts: [
      { text: 'Card: ', sensitive: false },
      { text: '4111-1111-1111-1111', sensitive: true, redacted: '[CREDIT_CARD]', step: 4 },
    ]
  },
  {
    parts: [
      { text: 'DB: ', sensitive: false },
      { text: 'postgres://user:pass@localhost:5432/db', sensitive: true, redacted: 'postgres://[REDACTED]:[REDACTED]@localhost:5432/db', step: 5 },
    ]
  }
];

const displayLines = computed(() => {
  return lines.map(line => ({
    parts: line.parts.map(part => ({
      ...part,
      redacting: part.sensitive && currentStep.value === part.step
    }))
  }));
});

const redactedCount = computed(() => {
  return lines.reduce((count, line) => {
    return count + line.parts.filter(part => part.sensitive && currentStep.value >= part.step).length;
  }, 0);
});

const progress = computed(() => {
  return currentStep.value / maxSteps;
});

let interval;

onMounted(() => {
  interval = setInterval(() => {
    if (currentStep.value < maxSteps) {
      currentStep.value++;
    } else {
      setTimeout(() => {
        currentStep.value = 0;
      }, 2000);
    }
  }, 800);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<style scoped>
.redaction-demo {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}

.demo-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.demo-content {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
  font-family: 'Fira Code', 'SF Mono', Monaco, monospace;
  font-size: 13px;
  line-height: 1.6;
  min-height: 160px;
  border: 1px solid var(--vp-c-divider);
}

.line {
  margin-bottom: 4px;
}

.line:last-child {
  margin-bottom: 0;
}

.sensitive {
  background: rgba(244, 63, 94, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
  color: #f43f5e;
  transition: all 0.3s ease;
}

.redacting {
  animation: pulse 0.8s ease-in-out;
  background: rgba(100, 108, 255, 0.2);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.redacted {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 600;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.arrow {
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(8px);
  }
}

.demo-stats {
  display: flex;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .arrow {
    transform: rotate(90deg);
  }

  .demo-content {
    font-size: 12px;
    padding: 12px;
    min-height: 140px;
  }
}
</style>
