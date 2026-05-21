<script setup lang="ts">
import { useDialog } from '@/composables/useDialog'

const { state, onConfirm, onCancel } = useDialog()
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div v-if="state.visible" class="cd-overlay" @click.self="onCancel">
        <div class="cd-panel">
          <div class="cd-header">
            <div class="cd-accent-line"></div>
            <span class="cd-title">{{ state.type === 'alert' ? '提示' : '确认' }}</span>
          </div>

          <p class="cd-message">{{ state.message }}</p>

          <div class="cd-footer">
            <button
              v-if="state.type === 'confirm'"
              class="cd-btn cd-btn--cancel"
              @click="onCancel"
            >
              取消
            </button>
            <button class="cd-btn cd-btn--ok" @click="onConfirm">
              {{ state.type === 'alert' ? '确定' : '确认' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cd-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 7, 16, 0.8);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: 40px;
}

.cd-panel {
  width: min(420px, 100%);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 36px 32px;
}

.cd-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.cd-accent-line {
  width: 24px;
  height: 1px;
  background: var(--color-accent);
  box-shadow: 0 0 6px var(--color-accent-glow);
}

.cd-title {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.cd-message {
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  max-width: 320px;
}

.cd-footer {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.cd-btn {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 10px 36px;
  transition: all 0.3s ease;
}

.cd-btn--cancel {
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.cd-btn--cancel:hover {
  color: var(--color-text-primary);
  border-color: var(--color-border-hover);
}

.cd-btn--ok {
  background: rgba(0, 200, 232, 0.1);
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
}

.cd-btn--ok:hover {
  background: rgba(0, 200, 232, 0.18);
  box-shadow: 0 0 20px var(--color-accent-glow), inset 0 0 20px rgba(0, 200, 232, 0.04);
}

/* 进出场过渡 */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.25s ease;
}

.dialog-fade-enter-active .cd-panel,
.dialog-fade-leave-active .cd-panel {
  transition: transform 0.25s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter-from .cd-panel {
  transform: scale(0.94);
}

.dialog-fade-leave-to .cd-panel {
  transform: scale(0.94);
}
</style>
