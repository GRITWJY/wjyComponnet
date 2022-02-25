const longpress = {
	bind: function (el, binding, vNode) {
		if (typeof binding.value !== 'function') {
			throw 'callback must be a function'
		}

		// 定义变量
		let pressTimer = null
		// 创建计时器（2s 后执行）
		let start = (e) => {
			// 这里是event对象里的内容
			// e.type表示事件的类型 https://developer.mozilla.org/zh-CN/docs/Web/API/Event
			// e.button的内容看这篇文章 https://blog.csdn.net/qq_36838191/article/details/106436192
			if (e.type === 'click' && e.button != 0) {
				return
			}
			if (pressTimer === null) {
				pressTimer = setTimeout(()=>{
					handler()
				},2000)
			}
		}

		// 取消计时器
		let cancel = (e) => {
			if (pressTimer !== null) {
				clearTimeout(pressTimer)
				pressTimer = null
			}
		}
		// 运行函数
		const handler = () => {
			binding.value()
			//此时绑定事件的binding.value是一个表达式，此处为方法是传过来的参数
			// 相当于是执行绑定的事件
		}

		// 添加事件监听器
		el.addEventListener('mousedown', start)
		el.addEventListener('touchstart', start)
		// 取消计时器
		el.addEventListener('click', cancel)
		el.addEventListener('mouseout', cancel)
		el.addEventListener('touchend', cancel)
		el.addEventListener('touchcancel', cancel)
	},
	// 当传进来的值更新的时候触发
	componentUpdated(el, { value }) {
		el.$value = value
	},
	// 指令与元素解绑的时候，移除事件绑定
	unbind(el) {
		el.removeEventListener('click', el.handler)
	},

}

export default longpress
