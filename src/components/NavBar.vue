<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)

// ---- 长按 ZENOX 进入编辑页 ----
let longPressTimer: ReturnType<typeof setTimeout> | null = null
const LONG_PRESS_MS = 2000
let longPressFired = false

function onLogoDown() {
  longPressFired = false
  longPressTimer = setTimeout(() => {
    longPressFired = true
    router.push({ name: 'edit' })
  }, LONG_PRESS_MS)
}

function onLogoUp() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
  // 短按：返回首页（如果不在首页）
  if (!longPressFired && route.name !== 'home') {
    router.push({ name: 'home' })
  }
}

function onLogoCancel() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

// 跳转至文章列表：已在首页则直接滚动，否则先导航再滚动
function goToArticles() {
  isMenuOpen.value = false
  if (route.name === 'home') {
    document.querySelector('.featured')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    const remove = router.afterEach(() => {
      document.querySelector('.featured')?.scrollIntoView({ behavior: 'smooth' })
      remove()
    })
    router.push({ name: 'home' })
  }
}

onUnmounted(() => {
  if (longPressTimer) clearTimeout(longPressTimer)
})
</script>

<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <div class="navbar__logo" role="button" tabindex="0" @mousedown.prevent="onLogoDown" @mouseup="onLogoUp"
        @mouseleave="onLogoCancel" @touchstart.prevent="onLogoDown" @touchend="onLogoUp" @touchcancel="onLogoCancel">
        <span class="navbar__logo-icon">&#9670;</span>
        <span class="navbar__logo-text">ZENOX</span>
      </div>

      <button class="navbar__toggle" :class="{ 'navbar__toggle--open': isMenuOpen }" @click="isMenuOpen = !isMenuOpen"
        aria-label="切换菜单">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="navbar__links" :class="{ 'navbar__links--open': isMenuOpen }">
        <button class="navbar__link" @click="goToArticles">文章</button>
        <RouterLink to="/resume" class="navbar__link" @click="isMenuOpen = false">简历</RouterLink>
        <RouterLink to="/" class="navbar__link">关于</RouterLink>
        <RouterLink to="/" class="navbar__link navbar__link--accent">订阅</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: rgba(2, 7, 16, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
}

.navbar__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  color: var(--color-text-primary);
  transition: color 0.3s ease;
  cursor: pointer;
  user-select: none;
}

.navbar__logo:hover {
  color: var(--color-accent);
}

.navbar__logo-icon {
  font-size: 1.1rem;
  color: var(--color-accent);
  filter: drop-shadow(0 0 6px var(--color-accent-glow));
}

.navbar__logo-text {
  position: relative;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 36px;
}

.navbar__link {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  transition: color 0.3s ease;
  position: relative;
}

.navbar__link:hover {
  color: var(--color-text-primary);
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.navbar__link:hover::after {
  transform: scaleX(1);
}

.navbar__link--accent {
  padding: 8px 20px;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.navbar__link--accent::after {
  display: none;
}

.navbar__link--accent:hover {
  background: rgba(0, 200, 232, 0.1);
  box-shadow: 0 0 20px var(--color-accent-glow), inset 0 0 20px rgba(0, 200, 232, 0.05);
  color: var(--color-accent);
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}

.navbar__toggle span {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--color-text-primary);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.navbar__toggle--open span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.navbar__toggle--open span:nth-child(2) {
  opacity: 0;
}

.navbar__toggle--open span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

@media (max-width: 768px) {
  .navbar__inner {
    padding: 0 24px;
  }

  .navbar__toggle {
    display: flex;
  }

  .navbar__links {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    background: rgba(2, 7, 16, 0.96);
    backdrop-filter: blur(20px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .navbar__links--open {
    opacity: 1;
    pointer-events: auto;
  }

  .navbar__link {
    font-size: 0.85rem;
  }
}
</style>
