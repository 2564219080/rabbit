<template>
  <div class="goods-image">

    <div class="middle" ref="target">
      <img :src="images[curIndex]" alt="">
      <div class="layer" v-if="!isOutside" :style="{top: top +'px',left: left + 'px'}"></div>
    </div>
    <ul class="small">
      <li v-for="(img,i) in images" :key="i" @mouseenter="curIndex = i" >
        <img :src="img" alt="" >
      </li>
    </ul>
    <div  v-if="!isOutside" class="large" :style="[{backgroundImage:`url(${images[curIndex]})`,
    backgroundPositionX: bgPosition.backgroundPositionX + 'px',
    backgroundPositionY: bgPosition.backgroundPositionY + 'px'}]"></div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    const curIndex = ref(0)
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    const top = ref(0)
    const left = ref(0)
    const bgPosition = ref({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    watch([elementX, elementY, isOutside], () => {
      if (elementX.value < 100) {
        left.value = 0
      }
      if (elementX.value > 300) {
        left.value = 200
      }
      if (elementX.value > 100 && elementX.value < 300) {
        left.value = elementX.value - 100
      }
      if (elementY.value < 100) {
        top.value = 0
      }
      if (elementY.value > 300) {
        top.value = 200
      }

      if (elementY.value > 100 && elementY.value < 300) {
        top.value = elementY.value - 100
      }

      bgPosition.value.backgroundPositionX = -left.value * 2
      bgPosition.value.backgroundPositionY = -top.value * 2
    })
    return {
      curIndex,
      target,
      top,
      left,
      bgPosition,
      isOutside
    }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    left: 0;
    top: 0;
    position: absolute;
  }
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index:500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
}
</style>
