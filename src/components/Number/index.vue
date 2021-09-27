<template>
  <div class="xtx-numbox">
    <div class="label" v-if="isLable">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="decrease">-</a>
      <input type="text" readonly :value="curNum" />
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxNumbox',
  props: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    modelValue: {
      type: Number
    },
    isLable: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    const curNum = ref(1)
    function add () {
      if (curNum.value === props.max) return false
      curNum.value++
      emit('update:modelValue', curNum.value)
      emit('change', curNum.value)
    }
    function decrease () {
      if (curNum.value === props.min) return false
      curNum.value--
      emit('update:modelValue', curNum.value)
      emit('change', curNum.value)
    }
    watch(() => {
      return props.modelValue
    }, () => {
      curNum.value = props.modelValue
    }, {
      immediate: true
    })
    return { add, decrease, curNum }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right:1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left:1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
