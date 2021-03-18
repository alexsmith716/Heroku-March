function isWebTarget(caller) {
	return Boolean(caller && caller.target === 'web')
}

function isWebpack(caller) {
	return Boolean(caller && caller.name === 'babel-loader')
}

module.exports = (api) => {
	const web = api.caller(isWebTarget)
	const webpack = api.caller(isWebpack)

	api.cache(true);

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: web ? 'entry' : undefined,
					corejs: web ? 'core-js@3' : false,
					targets: !web ? { node: 'current' } : undefined,
					modules: webpack ? false : 'commonjs',
				}
			],
			'@babel/preset-typescript',
			'@babel/preset-react',
		],
		plugins: [
			'@babel/plugin-transform-runtime',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-object-rest-spread',
			'@babel/plugin-proposal-export-default-from',
			['@babel/plugin-proposal-decorators', { legacy: true }],
			'@loadable/babel-plugin',
			[
				'babel-plugin-styled-components',
				{
					ssr: true,
					displayName: true
				}
			],
			'babel-plugin-import-graphql',
		],
	};
};
