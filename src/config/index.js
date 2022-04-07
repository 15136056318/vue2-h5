/*
 * @Description:  全局配置(与环境配置相关放env文件)
 * @Author: LiuYan
 * @Date: 2022-02-11 09:36:58
 * @LastEditTime: 2022-04-07 16:21:04
 * @LastEditors: LiuYan
 * @Reference:
 */
module.exports = {
  //系统设置
  APP: {
    // 业务中心侧边菜单标题
    title: 'Hello Word',
    // 是否做拦截登录
    isLogin: false,
  },
  HTTP: {
    // 是否开启代理（为false时，axios请求前缀自动变更为cross_domain）
    proxy: true,
    // 代理跨域地址
    cross_domain: 'http://ky.judaiot.com',
    // 跨域前缀数组
    cross_prefix: ['/h5'],
  },
}
