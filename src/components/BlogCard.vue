<script setup lang="ts">
defineProps<{
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
}>()
</script>

<template>
  <RouterLink :to="{ name: 'article', params: { slug } }" class="card">
    <div class="card__image">
      <div class="card__image-placeholder">
        <span class="card__image-icon">&#9670;</span>
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
          Read
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
  background: var(--color-bg-secondary);
}

.card__image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a1628 0%, #0f1f3a 50%, #0a1628 100%);
  position: relative;
}

.card__image-placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 40%, rgba(0, 200, 232, 0.08), transparent 60%),
    radial-gradient(circle at 70% 60%, rgba(240, 160, 80, 0.06), transparent 60%);
}

.card__image-icon {
  font-size: 2.5rem;
  color: var(--color-accent);
  opacity: 0.4;
  filter: drop-shadow(0 0 10px var(--color-accent-glow));
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
