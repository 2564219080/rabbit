<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <XtxGoodsItem v-for="good in goodsList" :goods="good" :key="good.id"/>
  </div>
</template>
<script>
import { findHotGoods } from '@/api/goods'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'GoodsHot',
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const route = useRoute()
    const { goodsList } = useHot(route.params.id, props.type)
    const title = computed(() => {
      return titleObj[props.type]
    })
    return { title, goodsList }
  }
}

function useHot (id, type) {
  const goodsList = ref({})
  function getGoodsList () {
    findHotGoods(id, type).then(res => {
      goodsList.value = res.result
    })
  }
  onMounted(() => {
    getGoodsList()
  })
  return {
    goodsList
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
}
</style>
