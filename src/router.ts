import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import type { RouterHistory } from 'vue-router'
import Home from './pages/Home.vue'

const routes = [{ path: '/', component: Home }]

export const createAppRouter = (isServer = false) => {
  const history: RouterHistory = isServer ? createMemoryHistory() : createWebHistory()

  return createRouter({
    history,
    routes
  })
}
