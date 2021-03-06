import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Home2 from '../views/Home2.vue'
import Statistics from "../views/Statistics";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "default",
    redirect: "/home"
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // }
  {
    path: '/home',
    name: 'Home',
    component: Home2
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
