/*
 * @Description:
 * @Author: LiuYan
 * @Date: 2022-02-10 21:05:05
 * @LastEditTime: 2022-02-11 10:39:17
 * @LastEditors: LiuYan
 * @Reference:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from '@/store/getters'
Vue.use(Vuex)
// vuex-persistedstate默认使用localStorage来固化数据
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      //指定持久化的模块
      paths: ['app'],
    }),
  ],
  getters,
  modules: { app },
})
