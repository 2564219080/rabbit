<template>
  <div class='xtx-goods-page' v-if="goods.mainPictures">
    <div class="container">
      <GoodsBread :goods="goods"/>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsItem :images="goods.mainPictures"/>
          <!-- 销售信息 -->
          <GoodsSales :good="goods" />
        </div>
        <!-- 右盒子  商品规格详情区域 -->
        <div class="spec">
          <GoodsName :good="goods" />
          <XtxNumbox v-model="number" />
          <XtxButton type="primary" size="mini"> CCC</XtxButton>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTab/>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsBread from './components/goods-bread'
import GoodsItem from './components/goods-items'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import { findGoods } from '@/api/goods'
import { ref, onMounted, provide } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import GoodsTab from './components/goods-tab'
import GoodsHot from './components/goods-hot'
import { useStore } from 'vuex'
import { Message } from '@/components/Message/index.js'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsBread,
    GoodsItem,
    GoodsSales,
    GoodsName,
    GoodsTab,
    GoodsHot
  },
  setup () {
    const route = useRoute()
    const goods = ref({})
    const number = ref(1)
    provide('goodData', goods)
    async function getGoods (id) {
      const res = await findGoods(id)
      goods.value = res.result
    }
    onMounted(async () => {
      await getGoods(route.params.id)
    })
    onBeforeRouteUpdate((to) => {
      getGoods(to.params.id)
    })
    const store = useStore()
    const currSku = ref(null)
    const insertCart = () => {
      // 没有完整的sku数据 直接return
      if (!currSku.value) {
        return false
      }
      // 没有商品梳理 直接return
      if (number.value > goods.value.inventory) {
        return false
      }
      store.dispatch('cart/asyncInsertCart', {
        id: goods.value.id,
        name: goods.value.name,
        picture: goods.value.mainPictures[0],
        skuId: currSku.value.skuId,
        price: currSku.value.oldPrice,
        nowPrice: currSku.value.price,
        attrsText: currSku.value.specsText,
        stock: currSku.value.inventory,
        selected: true,
        isEffective: true,
        count: number.value
      }).then(() => {
        Message({ type: 'success', text: '加入购物车成功' })
      })
    }
    return {
      goods,
      number,
      currSku,
      insertCart
    }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .spec{
    margin-left: 50px;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
