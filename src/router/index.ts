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
  ],
})

export default router
