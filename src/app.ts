import { createSSRApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router'
import { createI18nInstance } from './i18n'

export const createApp = (isServer = false) => {
  const app = createSSRApp(App)
  const router = createAppRouter(isServer)
  const i18n = createI18nInstance()

  app.use(router)
  app.use(i18n)

  return { app, router }
}
