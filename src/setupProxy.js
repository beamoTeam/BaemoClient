const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://34.195.94.5:2999",
      changeOrigin: true,
    }))
  app.use(
    '/chat',
    createProxyMiddleware({
      target: "http://34.195.94.5:3999",
      changeOrigin: true,
    })
  )
}
