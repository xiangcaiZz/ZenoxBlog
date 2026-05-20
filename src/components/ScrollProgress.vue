<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const percent = ref(0)

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  percent.value = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="scroll-progress" aria-hidden="true">
    <div class="scroll-progress__track">
      <div class="scroll-progress__fill" :style="{ height: percent + '%' }"></div>
    </div>
    <span class="scroll-progress__label">{{ percent }}%</span>
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  z-index: 50;
  pointer-events: none;
}

.scroll-progress__track {
  width: 1px;
  height: 280px;
  background: var(--color-border);
  position: relative;
  overflow: hidden;
  border-radius: 1px;
}

.scroll-progress__fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent-glow);
  transition: height 0.2s ease-out;
  border-radius: 1px;
}

.scroll-progress__label {
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
  writing-mode: vertical-rl;
  transition: color 0.3s ease;
}

@media (max-width: 640px) {
  .scroll-progress {
    right: 12px;
  }

  .scroll-progress__track {
    height: 200px;
  }
}
</style>
