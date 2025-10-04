<template>
  <div class="two-column-section">
    <div class="two-column-container">
      <div class="left-column">
        <slot name="left" />
      </div>
      <div class="right-column">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.two-column-section {
  background: rgba(0, 0, 0, 0.03);
  margin: 48px calc(-50vw + 50%) 48px calc(-50vw + 50%);
  padding: 60px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

:global(.dark) .two-column-section {
  background: rgba(255, 255, 255, 0.02);
}

.two-column-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: start;
}

.right-column {
  min-width: 0;
  width: 100%;
}

.left-column :deep(h2),
.right-column :deep(h2) {
  margin-top: 0;
  border: none !important;
  padding-top: 0 !important;
}

.left-column :deep(h3) {
  border: none !important;
  padding-top: 0 !important;
}

.left-column :deep(ul) {
  list-style: none;
  padding-left: 0;
}

.left-column :deep(li) {
  padding-left: 24px;
  position: relative;
}

.left-column :deep(li::before) {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: 700;
}

@media (max-width: 1024px) {
  .two-column-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .two-column-section {
    margin: 32px calc(-50vw + 50%) 32px calc(-50vw + 50%);
    padding: 40px 0;
  }
}

@media (max-width: 768px) {
  .two-column-container {
    padding: 0 16px;
  }

  .two-column-section {
    padding: 32px 0;
  }
}
</style>