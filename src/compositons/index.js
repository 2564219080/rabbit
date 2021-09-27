import { useIntersectionObserver, useInterval } from '@vueuse/core'
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

export function useCountDown () {
  const countTime = ref(0)
  const { pause, resume } = useInterval(() => {
    if (countTime.value === 0) {
      pause()
    } else {
      countTime.value--
    }
  }, 1000, false)
  function start (time) {
    countTime.value = time
    resume()
  }
  return {
    countTime,
    start,
    pause
  }
}
