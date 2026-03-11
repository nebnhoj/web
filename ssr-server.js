import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const clientDistDir = path.join(__dirname, 'dist/client')
const clientRoot = path.resolve(clientDistDir)

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp'
}

let rendererPromise

const getRenderer = async () => {
  if (!rendererPromise) {
    rendererPromise = (async () => {
      const template = await fs.readFile(path.join(clientDistDir, 'index.html'), 'utf-8')
      const { render } = await import('./dist/server/entry-server.js')

      return { template, render }
    })()
  }

  return rendererPromise
}

const serveStatic = async (pathname, res) => {
  const decodedPath = decodeURIComponent(pathname)
  const requestPath = decodedPath === '/' ? '/index.html' : decodedPath
  const filePath = path.resolve(clientDistDir, `.${requestPath}`)

  if (!filePath.startsWith(clientRoot)) {
    return false
  }

  try {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) {
      return false
    }

    const ext = path.extname(filePath)
    const type = MIME_TYPES[ext] ?? 'application/octet-stream'
    const body = await fs.readFile(filePath)

    res.setHeader('Content-Type', type)
    res.statusCode = 200
    res.end(body)
    return true
  } catch {
    return false
  }
}

export const handleRequest = async (req, res) => {
  const requestUrl = new URL(req.url || '/', 'http://localhost')
  const pathname = requestUrl.pathname

  if (pathname.startsWith('/assets/') || path.extname(pathname) || pathname === '/jb.ico') {
    const served = await serveStatic(pathname, res)

    if (served) {
      return
    }
  }

  try {
    const { template, render } = await getRenderer()
    const { appHtml } = await render(`${pathname}${requestUrl.search}`)
    const html = template.replace('<!--ssr-outlet-->', appHtml)

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Internal Server Error')
  }
}
