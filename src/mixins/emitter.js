// 查找子组件
function broadcast(componentName, eventName, params) {
	// 当前组件下的子组件
	this.$children.forEach(child => {
		const name = child.$options.name

		if (name === componentName) {
			child.$emit.apply(child, [eventName].concat(params))
		} else {
			broadcast.apply(child, [componentName, eventName].concat([params]))
		}
	})
}

export default {
	methods: {
		dispatch(componentName, eventName, params) {
			// 获取当前的父组件示例
			let parent = this.$parent || this.$root
			let name = parent.$options.name

			while (parent && (!name || name !== componentName)) {
				parent = parent.$parent

				if (parent) {
					name = parent.$options.name
				}
			}

			if (parent) {
				parent.$emit.apply(parent, [eventName].concat(params))
			}
		},

		broadcast(componentName, eventName, params) {
			broadcast.call(this, componentName, eventName, params)
		}
	}
}

/**
 * 因为是用作 mixins 导入，所以在 methods 里定义的 dispatch 和 broadcast 方法会被混合到组件里，自然就可以用 this.dispatch 和 this.broadcast 来使用。
 */
