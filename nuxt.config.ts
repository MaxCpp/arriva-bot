// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {enabled: true},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					silenceDeprecations: ["legacy-js-api"],
				},
			},
		},
	},
	css: [
		'assets/styles/normalize.scss',
		'assets/styles/common.scss',
	],

	components: [
		{
			path: '~/components', // will get any components nested in let's say /components/nested
			pathPrefix: false,
			extensions: ['.vue'],
		},
	],

	modules: [
		'nuxt3-leaflet'
	],

	app: {
		head: {
			title: 'Arriva Capodastria',
			meta: [
				{charset: 'utf-8'},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					hid: 'description',
					name: 'description',
					content: '',
				},
				{name: 'format-detection', content: 'telephone=no'},
				{name: 'msapplication-TileColor', content: '#da532c'},
				{name: 'msapplication-config', content: '/browserconfig.xml'},
				{name: 'theme-color', content: '#ffffff'},
			],
			link: [
				// {
				// 	rel: 'preconnect',
				// 	href: 'https://fonts.googleapis.com',
				// },
				// {
				// 	rel: 'preconnect',
				// 	href: 'https://fonts.gstatic.com',
				// },
				// {
				// 	rel: 'stylesheet',
				// 	href: 'https://fonts.googleapis.com/css2?family=Arimo&family=Exo+2&family=Fira+Sans&family=Hind+Siliguri&family=Titillium+Web&display=swap',
				// },
				// // {
				// // 	rel: 'stylesheet',
				// // 	type: 'text/css',
				// // 	href: 'https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.1/cookieconsent.min.css',
				// // 	body: true,
				// // },
				// {
				// 	rel: 'icon',
				// 	type: 'image/x-icon',
				// 	href: '/favicon.ico',
				// },
				// {
				// 	rel: 'apple-touch-icon',
				// 	sizes: '180x180',
				// 	type: 'image/x-icon',
				// 	href: '/apple-touch-icon.png',
				// },
				// {
				// 	rel: 'icon',
				// 	type: 'image/png',
				// 	sizes: '32x32',
				// 	href: '/favicon-32x32.png',
				// },
				// {
				// 	rel: 'icon',
				// 	type: 'image/png',
				// 	sizes: '16x16',
				// 	href: '/favicon-16x16.png',
				// },
				// {rel: 'manifest', href: '/site.webmanifest'},
				// {
				// 	rel: 'mask-icon',
				// 	href: '/safari-pinned-tab.svg',
				// 	color: '#5bbad5',
				// },
			],
		},
	},

	compatibilityDate: '2024-10-03',
})