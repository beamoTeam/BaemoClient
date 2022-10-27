const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  // app.use(
  //   '/oauth',
  //   createProxyMiddleware({
  //     target: "http://3.94.44.116:2999",
  //     changeOrigin: true,
  //   }))
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://3.94.44.116:2999",
      changeOrigin: true,
    }))
  app.use(
    '/chat',
    createProxyMiddleware({
      target: "http://3.94.44.116:3999",
      changeOrigin: true,
    })
  )
}