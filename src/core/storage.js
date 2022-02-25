// Storage封装
const USER_KEY = 'user'

export default {
	setItem(key, data) {
		window.sessionStorage.setItem(key, JSON.stringify(data))
	},
	// 获取某一个模块下面的属性user下面的userName
	getItem(key) {
		return JSON.parse(window.sessionStorage.getItem(key) || {})
	},
	remove(key) {
		window.sessionStorage.removeItem(key);
	},
	clear() {
		window.sessionStorage.clear();
	},


	setUserInfo(data){
		this.setItem(USER_KEY,data)
	},
	getUserInfo(){
		return this.getItem(USER_KEY)
	},
	removeUserInfo(){
		this.remove(USER_KEY)
	}


}

