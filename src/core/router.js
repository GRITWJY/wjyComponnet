import caches from './caches'
import auth from './auth'
import config from '../config'


const router = {
	curPage: undefined,
	components: {},
	history: [],
	param: {},
	onPathChange: undefined,
	to(page, param) {
		var toPage = this.pages[page]
		if (!toPage) {
			this.to(404, param)
		} else if (toPage.auth === config.auth || toPage.auth.indexOf(auth.user.role) !== -1) {
			this.param = param
			router.curPage = toPage.name
			router.param = param
			caches['cur-page'] = toPage.name
			caches['cur-page-param'] = router.param
			window.location.href = "/#" + toPage.path

			this.history.push({
				page, param
			})
		} else {
			this.to(405, param)
		}
		if (this.onPathChange) {
			this.onPathChange()
		}
	},
	back() {
		var toPage = this.history.pop()
		console.log(toPage)
		if (!toPage) {
			this.to(404)
		} else if (toPage.auth.indexOf(auth.user.role) !== -1) {
			alert('back')
		} else {
			this.to(405)
		}
		this.onPathChange()
	},
	init() {
		history.pushState(null, null, document.URL);
		window.addEventListener('popstate', function () {
			history.pushState(null, null, document.URL);
		});

		this.curPage = caches['cur-page'] || Object.keys(router.pages)[0]

		router.param = caches['cur-page-param'] ? caches['cur-page-param'] : {}

		let urlPath = ''
		if (location.href.indexOf('/#/') === -1) {
			location.href = "/#" + router.pages[router.curPage].path
		}
		// 初始化请求参数
		if (location.href.indexOf('?') !== -1) {
			urlPath = location.href.substring(location.href.indexOf('/#/') + 1, location.href.indexOf('?'))
			var params = location.href.split('?')[1].split('&')
			for (var p of params) {
				router.param[p.split('=')[0]] = decodeURI(p.split('=')[1])
			}
		} else {
			urlPath = location.href.substring(location.href.indexOf('#') + 1)
		}

		if (router.pages[router.curPage] == undefined || router.pages[router.curPage].path !== urlPath) {
			for (const p of Object.values(router.pages)) {
				if (p.path === urlPath) {
					router.to(p.name)
				}
			}
		}
	}
}

router.pages = config.pages

for (const k of Object.keys(config.pages)) {
	router.pages[k].name = k
	router.components['c' + router.pages[k].name] = router.pages[k].component
}

export default router
