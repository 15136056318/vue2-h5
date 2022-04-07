/*
 * @Description:
 * @Author: LiuYan
 * @Date: 2022-02-10 21:05:05
 * @LastEditTime: 2022-02-11 11:03:33
 * @LastEditors: LiuYan
 * @Reference:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
const { APP } = require('../config/index')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = APP.title
  }

  if (APP.isLogin) {
    if (to.fullPath === '/login') {
      next()
    } else {
      if (store.getters.token && store.getters.token.length) {
        next()
      } else {
        next('/login')
      }
    }
  } else {
    next()
  }
})
export default router
