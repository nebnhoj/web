import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  srcDir: 'server',
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
