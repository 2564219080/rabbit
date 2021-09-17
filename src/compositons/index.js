import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export function useObserver (apiFn) {
  const target = ref(null)
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        apiFn()
        stop()
      }
    },
    { threshold: 0 }
  )
  return {
    target
  }
}
