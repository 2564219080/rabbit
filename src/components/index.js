import Skeleton from './Skeleton'
import Slider from './Slider'
import More from './More'
import Bread from './Bread'
import BreadItem from './Bread/breadItem'
import GoodsItem from './GoodsItem'
import InfiniteLoad from './InfiniteLoad'
import City from './City'
import XtxNumber from './Number'
import Button from './Button'
import CheckBox from './CheckBox'
export default {
  install (Vue) {
    Vue.component(Skeleton.name, Skeleton)
    Vue.component(Slider.name, Slider)
    Vue.component(More.name, More)
    Vue.component(Bread.name, Bread)
    Vue.component(BreadItem.name, BreadItem)
    Vue.component(GoodsItem.name, GoodsItem)
    Vue.component(InfiniteLoad.name, InfiniteLoad)
    Vue.component(City.name, City)
    Vue.component(XtxNumber.name, XtxNumber)
    Vue.component(Button.name, Button)
    Vue.component(CheckBox.name, CheckBox)
  }
}
