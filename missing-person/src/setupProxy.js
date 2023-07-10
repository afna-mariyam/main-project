const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api1',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Replace with the URL of your first backend
      changeOrigin: true,
    })
  );

  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Replace with the URL of your second backend
      changeOrigin: true,
    })
  );
};