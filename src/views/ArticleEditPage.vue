<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageFooter from '@/components/PageFooter.vue'
import ArticleEditorModal from '@/components/ArticleEditorModal.vue'
import { useArticles } from '@/composables/useArticles'
import { useDialog } from '@/composables/useDialog'
import type { Article } from '@/data/articles'

const router = useRouter()
const dialog = useDialog()
const { articles, addArticle, updateArticle, removeArticle } = useArticles()

// 弹窗显示状态与当前编辑的文章（null = 新增模式）
const showModal = ref(false)
const editingArticle = ref<Article | null>(null)

// 打开新增文章弹窗
function openNew() {
  editingArticle.value = null
  showModal.value = true
}

// 打开编辑文章弹窗
function openEdit(article: Article) {
  editingArticle.value = article
  showModal.value = true
}

// 删除文章
async function handleDelete(slug: string, event: Event) {
  event.stopPropagation()
  const confirmed = await dialog.confirm('确认删除这篇文章？此操作不可撤销。')
  if (confirmed) {
    removeArticle(slug)
  }
}

// 保存回调：新增则插入列表头部，编辑则按 slug 合并更新，随后关闭弹窗并返回首页
function handleSave(data: { article: Article; content: string; isNew: boolean }) {
  if (data.isNew) {
    addArticle(data.article)
  } else {
    updateArticle(data.article.slug, data.article)
  }

  showModal.value = false
  router.push('/')
}
</script>

<template>
  <div class="edit-page">
    <section class="edit-page__hero">
      <div class="edit-page__inner">
        <div class="edit-page__accent-line"></div>
        <h1 class="edit-page__title">文章管理</h1>
        <p class="edit-page__subtitle">长按左上角 ZENOX 进入，管理你的内容</p>
      </div>
    </section>

    <section class="edit-page__list">
      <div class="edit-page__inner">
        <div class="edit-page__grid">
          <!-- 新增文章按钮 -->
          <button class="edit-card edit-card--add" @click="openNew">
            <span class="edit-card__plus">+</span>
            <span class="edit-card__add-label">新增文章</span>
          </button>

          <!-- 文章列表 -->
          <button
            v-for="a in articles"
            :key="a.slug"
            class="edit-card"
            @click="openEdit(a)"
          >
            <div class="edit-card__accent"></div>
            <div class="edit-card__body">
              <span class="edit-card__category">{{ a.category }}</span>
              <h3 class="edit-card__title">{{ a.title }}</h3>
              <p class="edit-card__excerpt">{{ a.excerpt }}</p>
            </div>
            <div class="edit-card__delete" @click="handleDelete(a.slug, $event)" title="删除文章">
              <span>&times;</span>
            </div>
          </button>
        </div>
      </div>
    </section>

    <PageFooter />

    <ArticleEditorModal
      v-if="showModal"
      :article="editingArticle"
      @close="showModal = false"
      @save="handleSave"
    />
  </div>
</template>

<style scoped>
.edit-page {
  min-height: 100vh;
}

.edit-page__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 40px;
}

.edit-page__hero {
  padding: 140px 40px 48px;
  text-align: center;
}

.edit-page__accent-line {
  width: 48px;
  height: 1.5px;
  background: var(--color-accent);
  margin: 0 auto 20px;
  box-shadow: 0 0 10px var(--color-accent-glow);
}

.edit-page__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.edit-page__subtitle {
  margin-top: 8px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.edit-page__list {
  padding: 0 40px 80px;
}

.edit-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.edit-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.edit-card:hover {
  border-color: var(--color-border-hover);
  box-shadow: 0 0 28px rgba(0, 200, 232, 0.05), 0 6px 24px rgba(0, 0, 0, 0.3);
  transform: translateY(-3px);
}

.edit-card--add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-style: dashed;
  border-color: var(--color-border);
  background: transparent;
  min-height: 200px;
}

.edit-card--add:hover {
  border-color: var(--color-accent);
  border-style: solid;
}

.edit-card__plus {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 300;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.edit-card--add:hover .edit-card__plus {
  color: var(--color-accent);
}

.edit-card__add-label {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.edit-card--add:hover .edit-card__add-label {
  color: var(--color-accent);
}

.edit-card__accent {
  height: 3px;
  background: var(--color-accent);
  opacity: 0.4;
  box-shadow: 0 0 6px var(--color-accent-glow);
}

.edit-card__body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.edit-card__category {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.edit-card__title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-primary);
  line-height: 1.35;
}

.edit-card__excerpt {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.edit-card__delete {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--color-text-muted);
  border: 1px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
  opacity: 0;
}

.edit-card:hover .edit-card__delete {
  opacity: 1;
}

.edit-card__delete:hover {
  color: #e04050;
  border-color: var(--color-border);
}

@media (max-width: 1024px) {
  .edit-page__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .edit-page__inner {
    padding: 0 24px;
  }

  .edit-page__hero {
    padding: 120px 24px 40px;
  }

  .edit-page__list {
    padding: 0 24px 60px;
  }

  .edit-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>
