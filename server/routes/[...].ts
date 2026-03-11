import { createError, defineEventHandler } from 'h3'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

let rendererPromise: Promise<{
  template: string
  render: (url: string) => Promise<{ appHtml: string }>
}> | null = null

const loadRender = async () => {
  const entryPath = resolve(process.cwd(), 'dist/server/entry-server.js')
  const entryUrl = pathToFileURL(entryPath).href
  const entryModule = await import(entryUrl)

  return entryModule.render as (url: string) => Promise<{ appHtml: string }>
}

const getTemplate = async () => {
  const searchRoots = new Set<string>()

  let currentDir = process.cwd()
  while (true) {
    searchRoots.add(currentDir)

    const parentDir = dirname(currentDir)
    if (parentDir === currentDir) {
      break
    }

    currentDir = parentDir
  }

  let moduleDir = dirname(new URL(import.meta.url).pathname)
  while (true) {
    searchRoots.add(moduleDir)

    const parentDir = dirname(moduleDir)
    if (parentDir === moduleDir) {
      break
    }

    moduleDir = parentDir
  }

  const templatePaths = Array.from(searchRoots).flatMap((searchRoot) => [
    resolve(searchRoot, '.output/public/index.html'),
    resolve(searchRoot, 'public/index.html'),
    resolve(searchRoot, 'dist/client/index.html')
  ])

  for (const templatePath of templatePaths) {
    try {
      return await readFile(templatePath, 'utf8')
    } catch {
      // Continue to the next candidate path.
    }
  }

  throw new Error('Unable to locate the SSR HTML template.')
}

const getRenderer = async () => {
  if (!rendererPromise) {
    rendererPromise = (async () => {
      const template = await getTemplate()
      const render = await loadRender()

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
