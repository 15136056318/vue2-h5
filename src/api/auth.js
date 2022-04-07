/*
 * @Description: 认证请求文件
 * @Author: LiuYan
 * @Date: 2022-02-10 21:20:38
 * @LastEditTime: 2022-03-25 10:02:42
 * @LastEditors: LiuYan
 * @Reference:
 */
import http from '@/utils/http'
// 实例
export const test = () => {
  return http({
    url: '/pc/index/getClsssList',
    method: 'POST',
    token: false,
  })
}
