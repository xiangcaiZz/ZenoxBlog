import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import HomePage from '@/views/HomePage.vue'

describe('App', () => {
  it('renders the router view with HomePage', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: HomePage }],
    })

    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Zenox')
  })
})
