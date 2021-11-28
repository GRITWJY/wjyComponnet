import Vue from 'vue'

import Cookies from 'js-cookie'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import june from './core/main'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.prototype.$auth = june.auth
Vue.prototype.$router = june.router
Vue.prototype.$caches = june.caches

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
});
