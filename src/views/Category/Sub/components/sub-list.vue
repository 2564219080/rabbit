<template>
  <div class="sort-list-container">
    <XtxGoodsItem  v-for="good in goodsList.items" :key="good.id" :goods="good"/>
    <XtxInfiniteLoad @load="loadNextList" :isFinished="isFinished" :isLoading="isLoading"/>
  </div>
</template>

<script>
import { findSubCategoryGoods } from '@/api/category'
import { ref, onMounted, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup () {
    const goodsList = ref([])
    const route = useRoute()
    const req = {
      page: 1,
      pageSize: 20,
      categoryId: route.params.id,
      sortField: null,
      attrs: [],
      brandId: null
    }
    const filterCondition = inject('filterCondition')
    async function getGoodsList () {
      const res = await findSubCategoryGoods(req)
      goodsList.value = res.result
    }

    onMounted(() => {
      getGoodsList()
    })

    watch(() => {
      return {
        filterCondition
      }
    }, async () => {
      const res = await findSubCategoryGoods({ ...req, ...filterCondition.value })
      goodsList.value = res.result
    }, {
      deep: true
    })

    const isFinished = ref(false)
    const isLoading = ref(false)

    async function loadNextList () {
      isLoading.value = true
      req.page++
      const res = await findSubCategoryGoods(req)
      if (res.result.items.length === 0) {
        isFinished.value = true
        isLoading.value = false
        return
      }
      goodsList.value.items = [...goodsList.value.items, ...res.result.items]
      isLoading.value = false
    }
    return {
      goodsList,
      loadNextList,
      isFinished,
      isLoading
    }
  }
}
</script>

<style>
.sort-list-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
   }
</style>
