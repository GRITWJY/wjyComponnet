import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Directives from './directive/directives'

import App from './App.vue'
import router from './router'

Vue.use(ElementUI);
Vue.use(Directives)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
