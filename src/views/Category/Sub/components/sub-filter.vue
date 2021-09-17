<template>
  <div class="sub-filter">
        <div
          class="item"
        >
          <div class="head">
            品牌
          </div>
          <div class="body">
            <a @click="onActive2(i)" :class="{active : active2 === i.id}" href="javascript:;" v-for="i in subCategoryData.brands" :key="i.id">{{ i.name }}</a>
          </div>
        </div>
        <!-- 规格 -->

        <div
          class="item"
          v-for="item in subCategoryData.saleProperties"
          :key="item.id"
        >
          <div class="head">{{ item.name }}：</div>
          <div class="body">
            <a
              href="javascript:;"
              v-for="i in item.properties"
              @click="onActive(i,item)"
              :key="i.id"
               :class="{ active: i.selected === true }"
              >{{ i.name }}</a
            >
          </div>
        </div>
      </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import { findSubCategoryFilter } from '@/api/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
export default {
  setup () {
    const subCategoryData = ref([])
    const route = useRoute()
    const setBrandId = inject('setBrandId')
    async function loadSubData (id) {
      const res = await findSubCategoryFilter(id)
      subCategoryData.value = res.result
      subCategoryData.value.brands.unshift({
        name: '全部',
        id: null
      })
      subCategoryData.value.saleProperties.forEach((item) => {
        item.properties.unshift({
          name: '全部',
          id: null
        })
        // 给每一个规格添加一个专门用来控制是否激活的字段 selected true 激活 false 不激活
        item.properties.forEach(item => {
          item.selected = false
        })
      })
    }
    onMounted(() => {
      loadSubData(route.params.id)
    })
    const setAttrs = inject('setAttrs')
    function onActive (i, all) {
      all.properties.forEach(item => {
        item.selected = false
      })
      i.selected = true
      setAttrs(i, all)
    }
    const active2 = ref(null)
    function onActive2 (i) {
      active2.value = i.id
      setBrandId(i.id)
    }
    onBeforeRouteUpdate((to) => {
      loadSubData(to.params.id)
    })
    return {
      subCategoryData,
      onActive,
      onActive2,
      active2
    }
  }
}
</script>

<style lang="less" scoped>
.sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      padding: 10px 0;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
