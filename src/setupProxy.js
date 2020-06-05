const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	// strip /api from api calls and route to dev core server
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:3001',
			changeOrigin: true,
			ws: true,
			pathRewrite: {
				'^/api/': '',
			},
		})
	)

	// route ws calls to dev core server
	app.use(
		'/socket.io',
		createProxyMiddleware({
			target: 'http://localhost:3001',
			changeOrigin: true,
			ws: true,
		})
	)
}
