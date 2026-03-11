import { createSSRApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router'

export const createApp = (isServer = false) => {
  const app = createSSRApp(App)
  const router = createAppRouter(isServer)

  app.use(router)

  return { app, router }
}
