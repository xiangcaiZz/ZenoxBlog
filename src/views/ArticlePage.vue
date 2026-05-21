<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import PageFooter from '@/components/PageFooter.vue'
import { useArticles } from '@/composables/useArticles'
import { get } from '@/utils/request'
import type { ArticleRecord } from '@/utils/request'
import type { Article } from '@/data/articles'

const { articles } = useArticles()

/** 文章详情数据（含 Markdown 渲染后的 HTML 与封面图片标识） */
interface ArticleData {
  id: number
  image: string
  title: string
  date: string
  category: string
  readTime: string
  excerpt: string
  contentHtml: string
}

const route = useRoute()
const router = useRouter()

const article = ref<ArticleData | null>(null)
const loading = ref(true)
const error = ref(false)

// 根据 image 值生成封面渐变
const coverStyle = computed(() => {
  if (!article.value) return {}
  const seed = Number(article.value.image) || 1
  const hues = [200, 260, 170, 30, 340, 45]
  const h = hues[(seed - 1) % hues.length]!
  return {
    background: `linear-gradient(135deg, hsl(${h}, 60%, 14%) 0%, hsl(${h + 20}, 50%, 8%) 50%, hsl(${h - 10}, 40%, 3%) 100%)`,
  }
})

// 根据 slug 从 articles 列表中查找 id，再通过 API 获取完整文章
async function fetchArticle(slug: string) {
  loading.value = true
  error.value = false

  try {
    const meta = articles.value.find((a) => a.slug === slug)
    if (!meta) throw new Error('文章不在列表中')

    const full = await get<ArticleRecord>(`/articles/${meta.id}`)
    const html = await marked.parse(full.content)

    article.value = {
      id: full.id,
      image: full.image,
      title: full.title,
      date: full.date,
      category: full.category,
      readTime: full.readTime,
      excerpt: full.excerpt,
      contentHtml: html,
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticle(route.params.slug as string)
})

watch(
  () => route.params.slug,
  (slug) => {
    fetchArticle(slug as string)
  },
)

function currentArticleMeta(): Article | undefined {
  return articles.value.find((a) => a.slug === route.params.slug)
}

function prevArticle(): Article | undefined {
  const meta = currentArticleMeta()
  if (!meta) return undefined
  const idx = articles.value.indexOf(meta)
  return idx > 0 ? articles.value[idx - 1] : undefined
}

function nextArticle(): Article | undefined {
  const meta = currentArticleMeta()
  if (!meta) return undefined
  const idx = articles.value.indexOf(meta)
  return idx < articles.value.length - 1 ? articles.value[idx + 1] : undefined
}

function goToArticle(slug: string) {
  router.push({ name: 'article', params: { slug } })
}
</script>

<template>
  <div class="article-page">
    <!-- Loading state -->
    <div v-if="loading" class="article-page__status">
      <div class="article-page__spinner"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="article-page__status">
      <p class="article-page__error-text">文章未找到。</p>
      <RouterLink to="/" class="article-page__back-link">&larr; 返回首页</RouterLink>
    </div>

    <!-- Article content -->
    <template v-else-if="article">
      <!-- 封面图 -->
      <div class="article-cover" :style="coverStyle">
        <div class="article-cover__overlay">
          <span class="article-cover__category">{{ article.category }}</span>
        </div>
      </div>

      <!-- Hero header -->
      <header class="article-header">
        <div class="article-header__inner">
          <div class="article-header__accent-line"></div>
          <div class="article-header__meta">
            <span class="article-header__category">{{ article.category }}</span>
            <span class="article-header__dot">&middot;</span>
            <span class="article-header__read-time">{{ article.readTime }}</span>
          </div>
          <h1 class="article-header__title">{{ article.title }}</h1>
          <p class="article-header__excerpt">{{ article.excerpt }}</p>
          <time class="article-header__date" :datetime="article.date">{{ article.date }}</time>
        </div>
      </header>

      <!-- Top navigation between articles -->
      <nav class="article-nav article-nav--top">
        <div class="article-nav__inner">
          <button
            v-if="prevArticle()"
            class="article-nav__link article-nav__link--prev"
            @click="goToArticle(prevArticle()!.slug)"
          >
            <span class="article-nav__label">&larr; 上一篇</span>
            <span class="article-nav__title">{{ prevArticle()!.title }}</span>
          </button>
          <span v-else class="article-nav__link article-nav__link--placeholder"></span>

          <button
            v-if="nextArticle()"
            class="article-nav__link article-nav__link--next"
            @click="goToArticle(nextArticle()!.slug)"
          >
            <span class="article-nav__label">下一篇 &rarr;</span>
            <span class="article-nav__title">{{ nextArticle()!.title }}</span>
          </button>
          <span v-else class="article-nav__link article-nav__link--placeholder"></span>
        </div>
      </nav>

      <!-- Body -->
      <main class="article-body">
        <div class="article-body__inner">
          <div class="article-body__content" v-html="article.contentHtml"></div>
        </div>
      </main>

      <!-- Navigation between articles -->
      <nav class="article-nav">
        <div class="article-nav__inner">
          <button
            v-if="prevArticle()"
            class="article-nav__link article-nav__link--prev"
            @click="goToArticle(prevArticle()!.slug)"
          >
            <span class="article-nav__label">&larr; 上一篇</span>
            <span class="article-nav__title">{{ prevArticle()!.title }}</span>
          </button>
          <span v-else class="article-nav__link article-nav__link--placeholder"></span>

          <button
            v-if="nextArticle()"
            class="article-nav__link article-nav__link--next"
            @click="goToArticle(nextArticle()!.slug)"
          >
            <span class="article-nav__label">下一篇 &rarr;</span>
            <span class="article-nav__title">{{ nextArticle()!.title }}</span>
          </button>
          <span v-else class="article-nav__link article-nav__link--placeholder"></span>
        </div>
      </nav>
    </template>

    <PageFooter />
  </div>
</template>

<style scoped>
/* ===== Loading / Error ===== */
.article-page__status {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 120px 40px 80px;
}

.article-page__spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.article-page__error-text {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
}

.article-page__back-link {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
  transition: opacity 0.3s ease;
}

.article-page__back-link:hover {
  opacity: 0.7;
}

/* ===== Article Cover ===== */
.article-cover {
  height: 360px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--nav-height);
}

.article-cover__overlay {
  position: absolute;
  inset: 0;
  background: rgba(2, 7, 16, 0.4);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px 32px;
}

.article-cover__category {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-primary);
  background: rgba(2, 7, 16, 0.75);
  border: 1px solid var(--color-border);
  padding: 6px 14px;
}

@media (max-width: 640px) {
  .article-cover {
    height: 220px;
  }

  .article-cover__overlay {
    padding: 16px 20px;
  }
}

/* ===== Article Header ===== */
.article-header {
  padding: 140px 40px 64px;
  text-align: center;
}

.article-header__inner {
  max-width: 720px;
  margin: 0 auto;
}

.article-header__accent-line {
  width: 48px;
  height: 1.5px;
  background: var(--color-accent);
  margin: 0 auto 24px;
  box-shadow: 0 0 10px var(--color-accent-glow);
}

.article-header__meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.article-header__category {
  color: var(--color-accent);
}

.article-header__dot {
  color: var(--color-text-muted);
}

.article-header__read-time {
  color: var(--color-text-muted);
}

.article-header__title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.15;
  margin-top: 20px;
  text-transform: uppercase;
}

.article-header__excerpt {
  max-width: 520px;
  margin: 20px auto 0;
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

.article-header__date {
  display: block;
  margin-top: 16px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* ===== Article Body ===== */
.article-body {
  padding: 0 40px 80px;
}

.article-body__inner {
  max-width: 720px;
  margin: 0 auto;
}

.article-body__content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

/* Markdown content styles */
.article-body__content :deep(h1) {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--color-text-primary);
  margin: 48px 0 16px;
  text-transform: uppercase;
}

.article-body__content :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-text-primary);
  margin: 40px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

.article-body__content :deep(p) {
  margin: 14px 0;
}

.article-body__content :deep(strong) {
  color: var(--color-text-primary);
  font-weight: 600;
}

.article-body__content :deep(ul),
.article-body__content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.article-body__content :deep(li) {
  margin: 6px 0;
}

.article-body__content :deep(code) {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.88em;
  background: rgba(0, 200, 232, 0.08);
  color: var(--color-accent);
  padding: 2px 6px;
  border-radius: 2px;
}

.article-body__content :deep(pre) {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  padding: 20px 24px;
  margin: 20px 0;
  overflow-x: auto;
}

.article-body__content :deep(pre code) {
  background: none;
  color: var(--color-text-secondary);
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.6;
}

.article-body__content :deep(blockquote) {
  border-left: 2px solid var(--color-accent);
  margin: 20px 0;
  padding: 4px 0 4px 20px;
  color: var(--color-text-muted);
  font-style: italic;
}

.article-body__content :deep(hr) {
  border: none;
  height: 1px;
  background: var(--color-border);
  margin: 40px 0;
}

.article-body__content :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-body__content :deep(a:hover) {
  opacity: 0.7;
}

/* ===== Article Navigation ===== */
.article-nav {
  padding: 0 40px 80px;
}

.article-nav__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  border-top: 1px solid var(--color-border);
  padding-top: 48px;
}

.article-nav--top .article-nav__inner {
  border-top: none;
  border-bottom: 1px solid var(--color-border);
  padding-top: 0;
  padding-bottom: 48px;
}

.article-nav__link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  padding: 24px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.article-nav__link:hover {
  border-color: var(--color-border-hover);
  box-shadow: 0 0 20px rgba(0, 200, 232, 0.04);
}

.article-nav__link--next {
  text-align: right;
  align-items: flex-end;
}

.article-nav__link--placeholder {
  visibility: hidden;
  border-color: transparent;
  background: none;
}

.article-nav__label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.article-nav__title {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--color-text-primary);
  line-height: 1.3;
}

@media (max-width: 640px) {
  .article-header {
    padding: 120px 24px 48px;
  }

  .article-body {
    padding: 0 24px 60px;
  }

  .article-nav {
    padding: 0 24px 60px;
  }

  .article-nav__inner {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .article-nav__link--next {
    text-align: left;
    align-items: flex-start;
  }
}
</style>
