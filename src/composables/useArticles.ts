import { ref } from 'vue'
import type { Article } from '@/data/articles'

// 模块级响应式文章列表，初始为空，由首页 API 请求填充
const articles = ref<Article[]>([])

export function useArticles() {
  // 从 API 批量覆盖文章列表
  function setArticles(list: Article[]) {
    articles.value = list
  }

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

  return { articles, setArticles, addArticle, updateArticle, removeArticle }
}
