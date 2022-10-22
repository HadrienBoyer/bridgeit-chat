module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,eot,svg,ttf,woff,woff2,jpg,png,ico,js,html,svelte,mjs,tsbuildinfo}'
	],
	swDest: 'dist/sw.js',
	swSrc: './src/sw.js'
};