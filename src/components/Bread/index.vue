<template>
  <div class='xtx-bread'>
    <slot/>
  </div>
</template>

<script>
import { provide } from 'vue'
export default {
  name: 'XtxBread',
  props: {
    separator: {
      type: String
    }
  },
  setup (props) {
    provide('separator', props.separator)
  }
}
</script>

<style scoped lang='less'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
