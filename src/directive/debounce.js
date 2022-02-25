/*
防抖
防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次。
1、 定义一个延迟执行方法，如果在延迟时间内再次调用改方法，则重新计算执行时间，从最后一次点击的1s后
2、 将时间绑定在click方法上
 */

const debounce = {
	//被绑定元素插入父节点时调用
	inserted: function (el, binding) {
		let timer
		el.addEventListener('keyup', () => {
			if (timer) {
				clearTimeout()
			}
			timer = setTimeout(() => {
				binding.value()
			}, 1000)
		})
	}
}
export default debounce
