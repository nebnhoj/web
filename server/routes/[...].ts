import { createError, defineEventHandler } from 'h3'
import { readFile } from 'node:fs/promises'

let rendererPromise: Promise<{
  template: string
  render: (url: string) => Promise<{ appHtml: string }>
}> | null = null

const getRenderer = async () => {
  if (!rendererPromise) {
    rendererPromise = (async () => {
      const [template, { render }] = await Promise.all([
        readFile('dist/client/index.html', 'utf8'),
        import('../../dist/server/entry-server.js') as Promise<{
          render: (url: string) => Promise<{ appHtml: string }>
        }>
      ])

      return { template, render }
    })()
  }

  return rendererPromise
}

export default defineEventHandler(async (event) => {
  const { pathname, search } = event.node.req.url
    ? new URL(event.node.req.url, 'http://localhost')
    : new URL('http://localhost/')

  try {
    const { template, render } = await getRenderer()
    const { appHtml } = await render(`${pathname}${search}`)

    return template.replace('<!--ssr-outlet-->', appHtml)
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'SSR rendering failed'
    })
  }
})
