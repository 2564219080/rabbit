import { createVNode, render } from 'vue'
import XtxMessage from './index.vue'
let timer
export function Message ({ type, text }) {
  const messageVNode = createVNode(XtxMessage, { type, text })
  const divContainer = document.createElement('div')
  document.body.appendChild(divContainer)
  render(messageVNode, divContainer)
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, divContainer)
  }, 2000)
}
