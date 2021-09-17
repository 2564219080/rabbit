<template>
  <div class="top-category">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ categoryName }}</XtxBreadItem>
      </XtxBread>
      <XtxSlider :sliders="sliders"/>
      <div class="sub-list">
        <h3>全部分类</h3>
          <ul>
            <li v-for="item in categoryAllList.children" :key="item.id">
               <a href="javascript:;">
                  <img :src="item.picture" />
                  <p>{{ item.name }}</p>
                </a>
            </li>
          </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryAllList.children" :key="item">
        <div class="head">
          <h3>-  {{ item.name }}  -</h3>
          <XtxMore to="/" />
        </div>
        <div class="body">
          <XtxGoodsItem :goods="goods" v-for="goods in item.goods" :key="goods.id"></XtxGoodsItem>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
export default {
  name: 'TopCategory',
  setup () {
    const sliders = ref([])
    async function loadBanner () {
      const { result } = await findBanner()
      sliders.value = result
    }
    onMounted(() => {
      loadBanner()
    })

    const categoryAllList = ref([])
    const categoryName = ref('')
    const route = useRoute()
    async function getList (id) {
      const { result } = await findTopCategory(id)
      categoryAllList.value = result
      categoryName.value = result.name
    }
    onMounted(() => {
      getList(route.params.id)
    })
    onBeforeRouteUpdate((to) => {
      getList(to.params.id)
    })
    return {
      sliders,
      categoryAllList,
      categoryName
    }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: 400;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
  }
  .sub-list ul {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;
    min-height: 160px;
    li {
      width: 168px;
      height: 160px;
      a {
        text-align: center;
        display: block;
        font-size: 16px;
        img {
          width: 100px;
          height: 100px;
        }
        p {
          line-height: 40px;
        }
      }
    }
  }
}
.ref-goods {
  margin-top:20px;
  background-color: #fff;
  .head {
    position: relative;
    .more {
      position: absolute;
      right: 20px;
      top: 30px;
    }
  }
  .body {
    display: flex;
    justify-content: space-around;
    padding: 0 20px;
  }
}
</style>
