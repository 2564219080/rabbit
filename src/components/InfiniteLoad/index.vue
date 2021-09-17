<template>
  <div class="xtx-infinite-loading" ref="container">
    <!-- 正在加载数据时显示 -->
    <div class="loading" v-if="isLoading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <!-- 数据全部加载完毕时显示 -->
    <div class="none" v-if="isFinished">
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'XtxInfiniteLoad',
  emits: ['load'],
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    isFinished: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const container = ref(null)
    useIntersectionObserver(
      container,
      ([{ isIntersecting }], dom) => {
        if (isIntersecting) {
          // 只有数据不在加载中且还没全部结束时才触发load事件
          if (props.isLoading === false && props.isFinished === false) {
            emit('load')
          }
        }
      },
      {
        threshold: 0
      }
    )
    return {
      container
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
