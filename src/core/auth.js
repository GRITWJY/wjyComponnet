import {login, logout, info} from '../api/auth'
import caches from './caches'
import router from './router'

const auth = {
	user: {},
	init() {
		auth.user = caches.user
		if (location.href.indexOf('/login') !== -1) {
			console.log("1")
			return
		}
		info().then((resp) => {
			if (resp.code !== -1) {
				this.user = resp.data
				caches.user = this.user
				console.log(this.user)
				// document.body.append('<style type="text/css">*[visible=' + this.user.role + '] {display: unset;}</style>')
			} else {
				caches.user = undefined
				alert('请登录后再使用系统！')
				router.to('/login')
			}
		})
	},
	login(username, password) {
		login({
			username: username,
			password: password
		}).then(resp => {
			console.log(resp)
			if (resp.success) {
				this.user = resp.data
				caches.user = this.user
				router.to('user')
			} else {
				alert(resp.message)
			}
		})
	},
	logout() {
		logout().then(() => {
			router.to('login')
		})
	}
}

export default auth
