<template>
  <div class="sub-category">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">
          首页
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/${subCategoryData.parentId}`">
          {{ subCategoryData.parentName }}
        </XtxBreadItem>
        <XtxBreadItem>
          {{ subCategoryData.name }}
        </XtxBreadItem>
      </XtxBread>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubBread',
  setup () {
    const subCategoryData = ref({})
    const route = useRoute()
    async function loadSubData (id) {
      const res = await findSubCategoryFilter(id)
      subCategoryData.value = res.result
    }
    onMounted(() => {
      loadSubData(route.params.id)
    })
    onBeforeRouteUpdate(to => {
      loadSubData(to.params.id)
    })
    return {
      subCategoryData
    }
  }
}
</script>

<style>

</style>
