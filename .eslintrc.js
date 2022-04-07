/*
 * @Description:
 * @Author: LiuYan
 * @Date: 2022-02-10 21:05:05
 * @LastEditTime: 2022-03-24 15:01:15
 * @LastEditors: LiuYan
 * @Reference:
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  // 指定为全局变量
  globals: {
    window: true, // 举例
    AMap: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quote-props': 0,
    quotes: [1, 'single'],
  },
}
