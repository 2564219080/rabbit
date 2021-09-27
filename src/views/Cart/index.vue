<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><XtxCheckbox :model-value="$store.getters['cart/isAll']" @change="allChange">全选</XtxCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-for="i in $store.getters['cart/effectiveList']" :key="i">
              <!-- 单选框 -->
              <!--
                有效果,但是不推荐 在严格模式下会报错 必须走mutation函数进行修改才可以
                难点：选择框最新的数据状态拿到 给它修改到vuex中对应的数据项上
                父组件中需要拿到子组件中的状态  子传父   自定义事件
               -->
              <td>
                <XtxCheckbox
                  :model-value="i.selected"
                  @change="(selected) => checkChange(i, selected)"
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"
                    ><img :src="i.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ i.name }}</p>
                    <!-- 选择规格组件 -->
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.nowPrice }}</p>
                <p>
                  比加入时降价
                  <span class="red">&yen;{{ i.price - i.nowPrice }}</span>
                </p>
              </td>
              <td class="tc">
                <XtxNumbox
                  :model-value="i.count"
                  :is-label="false"
                  @change="(num) => numChange(i, num)"
                  />
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (i.nowPrice * i.count).toFixed(2) }}
                </p>
              </td>
              <td class="tc">
                <p>
                  <a class="green" href="javascript:;" @click="delCart(i)"
                    >删除</a
                  >
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ $store.getters["cart/effectiveList"].length }} 件商品，已选择
          {{ $store.getters["cart/selectedList"].length }}件，商品合计：
          <span class="red"
            >¥{{ $store.getters["cart/allSelectedPrice"].toFixed(2) }}</span
          >
        </div>
        <div class="total">
          <XtxButton type="primary" @click="goSettled">下单结算</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { Message } from '@/components/Message/index.js'
import { useRouter } from 'vue-router'
export default {
  name: 'XtxCartPage',
  setup () {
    const store = useStore()
    const router = useRouter()
    function numChange (item, num) {
      store.dispatch('cart/asyncChangeCount', { good: item, count: num })
    }
    function checkChange (sku, selected) {
      store.dispatch('cart/asyncSingleCheck', { good: sku, selected })
    }
    function allChange (selected) {
      store.dispatch('cart/asyncAllCheck', selected)
    }
    function delCart (good) {
      store.dispatch('cart/asyncDelCart', good)
    }
    function goSettled () {
      if (!store.state.user.profile.token) {
        Message({ type: 'warn', text: '请先登录' })
        return false
      }
      if (store.getters['cart/selectedList'].length === 0) {
        Message({ type: 'warn', text: '请选择需要购买的商品' })
        return false
      }
      router.push('/settlement')
    }
    return {
      numChange,
      checkChange,
      allChange,
      delCart,
      goSettled
    }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
