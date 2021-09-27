<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem >填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
              <div v-if="!curAddress" class="none">
                您需要先添加收货地址才可提交订单
              </div>
              <ul v-if="curAddress">
                <li>
                  <span>收<i />货<i />人：</span>{{ curAddress.receiver }}
                </li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li>
                  <span>收货地址：</span
                  >{{ curAddress.fullLocation + curAddress.address }}
                </li>
              </ul>
            </div>
            <div class="action">
              <XtxButton class="btn" @click="visible = true">切换地址</XtxButton>
              <XtxButton class="btn">添加地址</XtxButton>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tbody>
                <tr v-for="item in checkoutInfo.goods" :key="item.id">
                  <td>
                    <a href="javascript:;" class="info">
                      <img :src="item.picture" alt="">
                      <div class="right">
                        <p>{{item.name}}</p>
                        <p>{{item.attrsText}}</p>
                      </div>
                    </a>
                  </td>
                  <td>&yen;{{item.payPrice}}</td>
                  <td>{{item.count}}</td>
                  <td>&yen;{{item.totalPrice}}</td>
                  <td>&yen;{{item.totalPayPrice}}</td>
                </tr>
              </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
         <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl><dt>商品件数：</dt><dd>{{checkoutInfo.summary.goodsCount}}件</dd></dl>
            <dl><dt>商品总价：</dt><dd>¥{{checkoutInfo.summary.totalPrice}}</dd></dl>
            <dl><dt>运<i></i>费：</dt><dd>¥{{checkoutInfo.summary.postFee}}</dd></dl>
            <dl><dt>应付总额：</dt><dd class="price">¥{{checkoutInfo.summary.totalPayPrice}}</dd></dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary" @click="submitOrder">提交订单</XtxButton>
        </div>
      </div>
    </div>
    <XtxDialog title="切换收获地址" :visible="visible" @close="visible=false">
        <div class="addressWrapper">
          <div class="text item"
          @click="selectedAddress = item"
          :class="{active:selectedAddress.id === item.id}"
          v-for="item in addressList" :key="item.id">
            <ul>
              <li>
                <span>收<i />货<i />人：</span>{{ item.receiver }}
              </li>
              <li><span>联系方式：</span>{{ item.contact }}</li>
              <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
            </ul>
          </div>
        </div>
        <template v-slot:footer>
          <XtxButton type="gray" style="margin-right: 20px" @click="cancelChange"
            >取消</XtxButton
          >
          <XtxButton type="primary" @click="confirmChange">确认</XtxButton>
        </template>
    </XtxDialog>
    <XtxDialog title="添加收货地址" :visible="addVisible" @close="addVisible=false">
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input v-model="formData.receiver" class="input" placeholder="请输入收货人" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
          <input v-model="formData.contact" class="input" placeholder="请输入手机号" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity @changeCty="changeCty" placeholder="请选择所在地区" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input  v-model="formData.address" class="input" placeholder="请输入详细地址" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input  v-model="formData.postalCode" class="input" placeholder="请输入邮政编码" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input v-model="formData.addressTags" class="input" placeholder="请输入地址标签，逗号分隔" />
            </div>
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <XtxButton type="gray" style="margin-right: 20px">取消</XtxButton>
        <XtxButton type="primary" @click="submit">确认</XtxButton>
      </template>
    </XtxDialog>
  </div>
</template>
<script>
import { findCheckoutInfo, addAddress, createOrder } from '@/api/order.js'
import { onMounted, ref, reactive } from 'vue'
import { Message } from '@/components/Message/index.js'
import { useRouter } from 'vue-router'
import { findCartList } from '@/api/cart'
import { useStore } from 'vuex'
export default {
  name: 'XtxPayCheckoutPage',
  setup () {
    const checkoutInfo = ref(null)
    const curAddress = ref(null)
    const addressList = ref(null)
    const selectedAddress = ref({})
    const visible = ref(false)
    const addVisible = ref(false)
    const router = useRouter()
    const store = useStore()
    async function loadCheckoutInfo () {
      const res = await findCheckoutInfo()
      checkoutInfo.value = res.result
      curAddress.value = checkoutInfo.value.userAddresses[0]
      addressList.value = checkoutInfo.value.userAddresses
    }
    function confirmChange () {
      // 确定按钮点击之后把当前选择的赋值给curAddress
      curAddress.value = selectedAddress.value
      visible.value = false
    }
    function cancelChange () {
      // 清空当前激活的地址
      selectedAddress.value = {}
      visible.value = false
    }
    onMounted(() => {
      loadCheckoutInfo()
    })
    const formData = reactive({
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 0,
      fullLocation: ''
    })
    const changeCty = (data) => {
      formData.provinceCode = data.provinceCode
      formData.cityCode = data.cityCode
      formData.countyCode = data.countyCode
      formData.fullLocation = data.fullLocation
    }
    async function submit () {
      await addAddress(formData)
      Message({ type: 'success', text: '新增地址成功' })
      // 关闭弹框
      addVisible.value = false
      // 重新拉取数据
      loadCheckoutInfo()
    }

    const reqParams = reactive({
      deliveryTimeType: 1,
      payType: 1,
      buyerMessage: '',
      addressId: null, // 地址id
      goods: [] // {skuId, count}
    })

    function submitOrder () {
      reqParams.addressId = curAddress.value.id
      reqParams.goods = checkoutInfo.value.goods.map(item => {
        return {
          skuId: item.skuId,
          count: item.count
        }
      })
      createOrder(reqParams).then(res => {
        router.push({
          path: '/pay',
          query: {
            id: res.result.id
          }
        })
        findCartList().then(res => {
          store.commit('cart/setList', res.result)
        })
      })
    }
    return {
      checkoutInfo,
      curAddress,
      addressList,
      selectedAddress,
      visible,
      confirmChange,
      cancelChange,
      addVisible,
      formData,
      changeCty,
      submit,
      submitOrder
    }
  }

}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,&:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
.xtx-dialog {
  .addressWrapper {
    max-height: 500px;
    overflow-y: auto;
  }
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
