<template>
  <div class="xtx-bread-item">
    <router-link :to="to" v-if="to"><slot/></router-link>
    <span v-else><slot /></span>
    <i v-if="separator"> {{ separator }}</i>
    <i  v-else class="iconfont icon-angle-right"></i>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: String
    }
  },
  setup () {
    const separator = inject('separator')
    return {
      separator
    }
  }
}
</script>
<style lang="less" scoped>
  .xtx-bread-item{
    // 最后一个i隐藏
    &:nth-last-of-type(1){
      i{
        display: none;
      }
    }
  }
</style>
