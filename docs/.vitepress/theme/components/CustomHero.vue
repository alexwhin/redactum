<template>
  <div class="custom-hero">
    <div class="container">
      <div class="hero-left">
        <h1 class="hero-title">
          <span class="title-text">{{ title }}</span>
        </h1>
        <p class="hero-tagline">{{ tagline }}</p>
        <div class="hero-actions">
          <a
            v-for="action in actions"
            :key="action.text"
            :href="action.link"
            :class="['action-button', action.theme]"
          >
            {{ action.text }}
          </a>
        </div>
      </div>
      <div class="hero-right">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  tagline: String,
  actions: Array
});
</script>

<style scoped>
.custom-hero {
  padding: 80px 24px 96px;
  background: var(--vp-c-bg);
}

.custom-hero .container {
  max-width: 1152px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin: 0;
}

.title-text {
  background: -webkit-linear-gradient(120deg, #646cff 30%, #41d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-tagline {
  font-size: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 560px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.action-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 20px;
  padding: 0 24px;
  line-height: 44px;
  font-size: 16px;
  text-decoration: none;
}

.action-button:hover {
  text-decoration: none;
}

.action-button.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}

.action-button.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}

.action-button.alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.action-button.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.hero-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 960px) {
  .custom-hero {
    padding: 48px 24px 64px;
  }

  .custom-hero .container {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .hero-title {
    font-size: 40px;
  }

  .hero-tagline {
    font-size: 18px;
  }

  .hero-right {
    order: -1;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-tagline {
    font-size: 16px;
  }

  .action-button {
    padding: 0 20px;
    line-height: 40px;
    font-size: 14px;
  }
}
</style>
