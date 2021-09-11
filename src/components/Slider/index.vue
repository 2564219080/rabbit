<template>
  <div class="box" style="height:500px">
    <div class="xtx-slider" @mouseenter="clearTimer" @mouseleave="startTimer">
      <!-- 图片列表 -->
      <ul class="slider-body">
        <!--
          fade: 当fade类名存在 当前图片就显示 不存在就不显示
         -->
        <li
          class="slider-item"
          v-for="(item, i) in sliders"
          :key="i"
          :class="{ fade: curIndex === i }"
        >
          <img :src="item.imgUrl" alt="" />
        </li>
      </ul>
      <!-- 圆圈切换按钮 -->
      <div class="slider-indicator">
        <span :class="{active: curIndex === index}"
          v-for="(item,index) in sliders"
          :key="index"
          @click="curIndex = index"></span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 目标：点击圆圈按钮 实现对应图片的切换
 * 思路：
 *   1. 图片和圆圈按钮数量是一样的 下标值是对应的
 *   2. 记录一下当前点击的是哪一项
 *   3. 需要根据记录下来的下标值 去配合:class 控制fade这个类名是否应该显示
 */
import { ref, onMounted, onUnmounted } from 'vue'
export default {
  name: 'XtxSlider',
  props: {
    sliders: {
      type: Array,
      default () {
        return []
      }
    },
    auto: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const curIndex = ref(0)
    const timer = ref(null)
    function autoPlay () {
      if (!props.auto) {
        return
      }
      timer.value && window.clearInterval(timer.value)
      timer.value = setInterval(() => {
        curIndex.value++
        if (curIndex.value === props.sliders.length) {
          curIndex.value = 0
        }
      }, 1500)
    }
    onMounted(() => {
      autoPlay()
    })
    onUnmounted(() => {
      window.clearInterval(timer.value)
    })
    function startTimer () {
      autoPlay()
    }
    function clearTimer () {
      window.clearInterval(timer.value)
    }
    return {
      curIndex,
      startTimer,
      clearTimer
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-slider {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .slider {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .slider-btn {
      opacity: 1;
    }
  }
}
</style>
