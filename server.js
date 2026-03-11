import { createServer } from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const port = Number(process.env.PORT) || 5173

const template = await fs.readFile(path.join(__dirname, 'dist/client/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

const serveStatic = async (urlPath, res) => {
  const filePath = path.join(__dirname, 'dist/client', decodeURIComponent(urlPath))

  if (!filePath.startsWith(path.join(__dirname, 'dist/client'))) {
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

    res.writeHead(200, { 'Content-Type': type })
    res.end(body)
    return true
  } catch {
    return false
  }
}

createServer(async (req, res) => {
  const url = req.url || '/'

  if (url.startsWith('/assets/') || url === '/jb.ico' || url === '/robots.txt' || url === '/sitemap.xml' || url === '/profile.json') {
    const served = await serveStatic(url, res)
    if (served) {
      return
    }
  }

  try {
    const { appHtml } = await render(url)
    const html = template.replace('<!--ssr-outlet-->', appHtml)

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(html)
  } catch (error) {
    console.error(error)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
  }
}).listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`)
})
