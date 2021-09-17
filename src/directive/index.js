import defaultImg from '@/assets/images/200.png'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  install (Vue) {
    Vue.directive('imgLazy', {
      mounted (el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
              el.onerror = function () {
                el.src = defaultImg
              }
              el.src = binding.value
              stop()
            }
          },
          { threshold: 0 }
        )
      }
    })
  }
}
