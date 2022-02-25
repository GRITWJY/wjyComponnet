import copy from "@/directive/copy";
import longpress from '@/directive/longpress'

const directives = {
	copy,
	longpress
}

export default {
	install(Vue) {
		Object.keys(directives).forEach((key) => {
			Vue.directive(key, directives[key])
		})
	}
}
