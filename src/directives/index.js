/*
 * @Description: 全局自定义指令
 * @Author: LiuYan
 * @Date: 2022-02-10 21:22:39
 * @LastEditTime: 2022-03-25 10:38:47
 * @LastEditors: LiuYan
 * @Reference:
 */
//示例
export const log = () => ({
  bind(el, binding, vNode, oldNode) {
    console.log(el, binding, vNode, oldNode)
    console.log('---bind---')
  },
  inserted() {
    console.log('---inserted---')
  },
  update() {
    console.log('---update---')
  },
  componentUpdated() {
    console.log('---componentUpdated---')
  },
  unbind() {
    console.log('---unbind---')
  },
})

// 使用方法 v-color="'red'"
export const color = () => ({
  bind(el, binding) {
    el.style.color = binding.value
  },
})
