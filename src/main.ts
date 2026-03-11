import './assets/index.css'
import { createApp } from './app'

const { app, router } = createApp()

router.isReady().then(() => {
  app.mount('#app', true)
})
