<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  image: string
}>()

// 根据 image 值取色相环不同位置，为每篇文章生成唯一封面渐变色
const coverStyle = computed(() => {
  const seed = Number(props.image) || 1
  const hues = [200, 260, 170, 30, 340, 45]
  const h = hues[(seed - 1) % hues.length]!
  return {
    background: `linear-gradient(135deg, hsl(${h}, 60%, 12%) 0%, hsl(${h + 20}, 50%, 8%) 40%, hsl(${h - 10}, 40%, 5%) 100%)`,
  }
})
</script>

<template>
  <RouterLink :to="{ name: 'article', params: { slug } }" class="card">
    <div class="card__image" :style="coverStyle">
      <div class="card__image-overlay">
        <span class="card__image-icon">&#9670;</span>
        <span class="card__image-badge">{{ category }}</span>
      </div>
    </div>

    <div class="card__body">
      <div class="card__meta">
        <span class="card__category">{{ category }}</span>
        <span class="card__dot">&#183;</span>
        <span class="card__read-time">{{ readTime }}</span>
      </div>

      <h3 class="card__title">{{ title }}</h3>
      <p class="card__excerpt">{{ excerpt }}</p>

      <div class="card__footer">
        <time class="card__date" :datetime="date">{{ date }}</time>
        <span class="card__cta">
          阅读
          <span class="card__arrow">&rarr;</span>
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  overflow: hidden;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  border-color: var(--color-border-hover);
  box-shadow:
    0 0 40px rgba(0, 200, 232, 0.06),
    0 8px 32px rgba(0, 0, 0, 0.4);
  transform: translateY(-4px);
}

.card__image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 7, 16, 0.35);
  transition: background 0.4s ease;
}

.card:hover .card__image-overlay {
  background: rgba(2, 7, 16, 0.15);
}

.card__image-icon {
  font-size: 2.5rem;
  color: var(--color-accent);
  opacity: 0.35;
  filter: drop-shadow(0 0 10px var(--color-accent-glow));
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.card:hover .card__image-icon {
  opacity: 0.55;
  transform: scale(1.1);
}

.card__image-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: var(--font-display);
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-primary);
  background: rgba(2, 7, 16, 0.7);
  border: 1px solid var(--color-border);
  padding: 4px 10px;
}

.card__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  font-family: var(--font-display);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.card__category {
  color: var(--color-accent);
}

.card__dot,
.card__read-time {
  color: var(--color-text-muted);
}

.card__title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.4;
  color: var(--color-text-primary);
}

.card__excerpt {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.card__date {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.card__cta {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
  transition: gap 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.card:hover .card__cta {
  gap: 12px;
}

.card__arrow {
  transition: transform 0.3s ease;
}

.card:hover .card__arrow {
  transform: translateX(2px);
}
</style>
