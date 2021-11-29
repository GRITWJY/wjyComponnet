
const auth = ['admin', 'worker']
const config = {
	// BASE_URL: 'https://junesunray.com/eim',
	BASE_URL: 'http://localhost:8090',
	REQUEST_TIMEOUT: 5000,
	auth: auth,
	pages: {
		login: {
			path: '/login',
			component: () => import('@/views/login/index'),
			auth: auth
		},

		dashboard: {
			path: '/dashboard',
			component: () => import('@/views/dashboard/index'),
			auth: auth
		},
		user: {
			path: '/user',
			component: () => import('@/views/user/index'),
			auth: auth
		},
		flight: {
			path: '/flight',
			component: () => import('@/views/flight/index'),
			auth: auth
		},
		choseseat: {
			path: '/choseseat',
			component: () => import('@/views/choseseat/index'),
			auth: auth
		},
		selectquory: {
			path: '/selectquory',
			component: () => import('@/views/selectquory/index'),
			auth: auth
		},
		ticket: {
			path: '/ticket',
			component: () => import('@/views/ticket/index'),
			auth: auth
		},
		404: {
			path: '/404',
			component: () => import('@/views/public/404'),
			auth: auth
		},
		405: {
			path: '/405',
			component: () => import('@/views/public/405'),
			auth: auth
		}
	}
}

export default config
