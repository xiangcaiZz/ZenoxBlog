import { ref } from 'vue'
import { articles as initialArticles, type Article } from '@/data/articles'

// 模块级响应式文章列表，所有调用方共享同一份数据
const articles = ref<Article[]>([...initialArticles])

export function useArticles() {
  // 新增文章到列表头部
  function addArticle(article: Article) {
    articles.value.unshift(article)
  }

  // 按 slug 查找并合并更新文章字段
  function updateArticle(slug: string, patch: Partial<Article>) {
    const idx = articles.value.findIndex((a) => a.slug === slug)
    if (idx !== -1) {
      articles.value[idx] = { ...articles.value[idx]!, ...patch }
    }
  }

  // 按 slug 删除文章
  function removeArticle(slug: string) {
    const idx = articles.value.findIndex((a) => a.slug === slug)
    if (idx !== -1) {
      articles.value.splice(idx, 1)
    }
  }

  return { articles, addArticle, updateArticle, removeArticle }
}
