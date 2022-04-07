/*
 * @Description:
 * @Author: LiuYan
 * @Date: 2022-02-10 21:05:05
 * @LastEditTime: 2022-04-07 16:10:22
 * @LastEditors: LiuYan
 * @Reference:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters/index'
import * as directives from './directives/index'
import '@/assets/styles/common/main.less'
import './plugins/all'
import './utils/eventBus'

// 全局注册过滤器
Object.keys(filters).forEach(k => {
  Vue.filter(k, filters[k])
})

// 全局注册自定义指令
Object.keys(directives).forEach(k => {
  Vue.directive(k, directives[k]())
})

// 测试是否可以完成跨域
// import { test } from './api/auth'
// test().then(() => {})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
