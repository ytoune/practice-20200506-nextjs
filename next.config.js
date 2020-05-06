const path = require('path')
new Function('return this')().Element = class ElementMock {}
const basePath =
	'development' === process.env.NODE_ENV ? '' : '/practice-20200506-nextjs/'
module.exports = {
	assetPrefix: basePath,
	publicRuntimeConfig: {
		basePath,
	},
	webpack(config, _options) {
		config.resolve.alias = {
			...config.resolve.alias,
			'~': path.resolve(__dirname, 'src'),
		}
		return config
	},
}
