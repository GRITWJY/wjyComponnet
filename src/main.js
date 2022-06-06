import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import Directives from "./directive/directives";
// import LazyLoad from "@/directive/lazyload";

import App from "./App.vue";
import router from "./router";

import "./styles/index.less";

Vue.use(ElementUI);
// Vue.use(Directives);
// Vue.use(LazyLoad);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
