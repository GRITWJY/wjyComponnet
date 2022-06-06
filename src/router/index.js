import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/ect/card",
    name: "card",
    component: () => import("@/examples/card")
  }

  // {
  //   path: "/",
  //   name: "form",
  //   component: () => import("@/examples/example")
  // },
  // {
  //   path: "/display",
  //   name: "display",
  //   component: () => import("@/views/display")
  // }

  // {
  // 	path: '/',
  // 	name: 'directive',
  // 	component: () => import('@/views/About')
  // 	// component: () => import('@/views/directive/index')
  // },
  // {
  // 	path: '/index',
  // 	name: 'compo',
  // 	component: () => import('@/views/com/index')
  // },
  // {
  // 	path: '/home',
  // 	name: 'Home',
  // 	component: Home
  // },
  // {
  // 	path: '/about',
  // 	name: 'About',
  // 	component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
