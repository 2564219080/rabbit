<template>
  <div class="list-container">
      <!-- 排序区域 -->
      <div class="sub-sort">
        <div class="sort">
          <a href="javascript:;"
           v-for="(item,index) in sorTypeListRef"
           :key="index"
           @click="toggleSort(item.value)"
           :class="{ active : currentSort === item.value}"
           >
            {{ item.name }}排序
          </a>
        </div>
      </div>
  </div>
</template>
<script>
import { ref, inject } from 'vue'
export default {
  name: 'SubSort',
  setup () {
    const sorTypeListRef = ref([
      { name: '默认', value: null },
      { name: '时间', value: 'publishTime' },
      { name: '人气', value: 'orderNum' },
      { name: '评论', value: 'evaluateNum' }
    ])
    const currentSort = ref(null)
    const setSortField = inject('setSortField')
    function toggleSort (value) {
      currentSort.value = value
      setSortField(value)
    }
    return {
      sorTypeListRef,
      currentSort,
      toggleSort
    }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
.list-container{
  margin-top: 20px;
  padding: 0 20px;
  background: #fff;
}
</style>
