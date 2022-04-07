/*
 * @Description: 天气接口
 * @Author: LiuYan
 * @Date: 2022-03-25 10:02:33
 * @LastEditTime: 2022-03-25 10:06:40
 * @LastEditors: LiuYan
 * @Reference:
 */
import http from '@/utils/http'
/*
 * @description: 免费七日天气接口 (仅限个人测试每日300次)
 *
 * {{ weathers[0].tem2 }}-{{ weathers[0].tem1 }} 最低气温、最高气温
 * {{ weathers[0].wea_day }} 天气描述
 * <img :src="require(`../../assets/icon/${weathers[0].wea_day_img}.png`)" width="15px" /> 加载天气相应的图片
 * weather().then(res => {
 *   if (res.data && res.data.length > 0) {
 *      this.weathers = res.data
 *   }
 * })
 *
 */
export const weather = () => {
  return http({
    url: 'https://yiketianqi.com/api?unescape=1&version=v1&appid=95736169&appsecret=U1pOI1ge',
    method: 'get',
    token: false,
  })
}
