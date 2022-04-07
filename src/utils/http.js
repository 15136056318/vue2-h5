/*
 * @Description: http 封装
 * @Author: LiuYan
 * @Date: 2021-12-05 13:54:34
 * @LastEditTime: 2022-03-09 16:50:14
 * @LastEditors: LiuYan
 * @Reference:
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
const { HTTP, APP } = require('../config/index.js')
//请求拦截
axios.interceptors.request.use(function (config) {
  if (process.env.NODE_ENV === 'production') config.baseURL = HTTP.cross_domain
  return config
})
//响应拦截
axios.interceptors.response.use(res => {
  const _res = res.data
  if (_res.code === 401 && APP.isLogin) {
    router.replace('/login')
  }
  if (_res.code === 500) {
    console.error('500')
  }
  return _res
})
const fetch = ({
  url,
  method = 'GET',
  params,
  data = {},
  headers = {
    'content-type': 'application/json',
  },
  token = true,
  ...other
}) => {
  const options = {
    url,
    method,
    data,
    params,
    headers,
    ...other,
  }
  if (token) {
    options.headers['Authorization'] = store.getters.token
  }
  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        const res = err.response
        if (res.status === 500) {
          console.error('500')
        }
        reject(err)
      })
  })
}
export default fetch
