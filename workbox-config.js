module.exports = {
	globDirectory: './dist/',
	globPatterns: [
		'**/*.{css,eot,svg,ttf,woff,woff2,jpg,mp3,png,ico,pdf,js,json,webmanifest,html,svelte,mjs,tsbuildinfo}'
	],
	swDest: './dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^param/,
		/^admin/
	]
};