import Skeleton from './Skeleton'
import Slider from './Slider'
import More from './More'
export default {
  install (Vue) {
    Vue.component(Skeleton.name, Skeleton)
    Vue.component(Slider.name, Slider)
    Vue.component(More.name, More)
  }
}
