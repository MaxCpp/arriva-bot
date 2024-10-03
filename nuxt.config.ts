// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.APP_ENV === 'development';
const isStaging = process.env.APP_ENV === 'staging';
const isProd = process.env.APP_ENV === 'production';
const FRONTEND_URL = isStaging ? 'https://staging.18peaches.com' : (isProd ? 'https://18peaches.com' : 'http://localhost:3000');
const BACKEND_URL = isStaging ? 'https://staging-api.18peaches.com': isProd ? 'https://api.18peaches.com' : 'http://localhost:3010';
console.log('APP_ENV:', process.env.APP_ENV);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FRONTEND_URL:', FRONTEND_URL);
console.log('BACKEND_URL:', BACKEND_URL);

export default defineNuxtConfig({
	// compatibilityDate: "2024-10-03",
	devtools: {enabled: false},
	routeRules: {
		'/': { prerender: true },
		'/map': { ssr: false },
	},
	runtimeConfig: {
		public: {
			HOST_FRONTEND: FRONTEND_URL,
			HOST_BACKEND: BACKEND_URL,
			API_BACKEND_URL: `${BACKEND_URL}/api/v1`,
		}
	},
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

	// modules: [
	// 	'@nuxtjs/leaflet'
	// ],

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