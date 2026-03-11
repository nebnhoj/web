import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  preset: 'vercel',
  compatibilityDate: '2026-03-11',
  publicAssets: [
    {
      dir: 'dist/client',
      baseURL: '/'
    },
    {
      dir: 'public',
      baseURL: '/'
    }
  ]
})