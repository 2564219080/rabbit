<template>
  <div class="sub-category">
    <div class="container">
      <SubBread/>
      <SubFilter/>
      <SubSort/>
      <SubList/>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import SubList from './components/sub-list'
import { ref, provide } from 'vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    SubList
  },
  setup () {
    const filterCondition = ref({
      attrs: [],
      sortField: null,
      brandId: null
    })
    function setSortField (value) {
      filterCondition.value.sortField = value
    }
    function setBrandId (value) {
      filterCondition.value.brandId = value
    }
    function setAttrs (value, all) {
      filterCondition.value.attrs.forEach((i, index) => {
        all.properties.forEach((j) => {
          if (i.id === j.id) {
            filterCondition.value.attrs.splice(index, 1)
          }
        })
      })
      filterCondition.value.attrs.push(value)
      console.log(filterCondition.value.attrs)
    }
    provide('filterCondition', filterCondition)
    provide('setSortField', setSortField)
    provide('setBrandId', setBrandId)
    provide('setAttrs', setAttrs)
  }
}
</script>

<style scoped lang="less">
.goods-list{
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}

</style>
