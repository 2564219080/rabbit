<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <!-- 选中小图标 -->
    <i v-if="checked" class="iconfont icon-checked"></i>
    <!-- 未选中小图标 -->
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 自定义文字 -->
    <span><slot/></span>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxCheckBox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      emit('update:modelValue', checked.value)
      emit('change', checked.value)
    }
    watch(() => props.modelValue,
      () => {
        checked.value = props.modelValue
      }, {
        immediate: true
      })
    return {
      checked,
      changeChecked
    }
  }

}
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
