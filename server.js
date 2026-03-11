import { createServer } from 'node:http'
import { handleRequest } from './ssr-server.js'

const port = Number(process.env.PORT) || 5173

createServer(handleRequest).listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`)
})
