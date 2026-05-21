import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('@/views/ArticlePage.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/views/ArticleEditPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
