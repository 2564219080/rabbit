<template>
  <div class="goods-comment">
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
        <p>
          <span>{{ commentInfo.evaluateCount }}</span
          ><span>条评价</span>
        </p>
        <p>
          <span>{{ commentInfo.hasPictureCount}}</span>
          <span>条有图评价</span>
        </p>
      </div>
    </div>
        <!-- 排序 -->
    <div class="sort">
      <span>排序：</span>
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === null }"
        @click="changeSort(null)"
        >默认</a
      >
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        @click="changeSort('praiseCount')"
        >最热</a
      >
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'createTime' }"
        @click="changeSort('createTime')"
        >最新</a
      >
      <xtx-check-box  style="margin-left:50px;" v-model="reqParams.hasPicture">是否有图</xtx-check-box>
    </div>
    <!-- 列表 -->
    <div class="list" v-if="commentList.items">
      <div class="item" v-for="item in commentList.items" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ item.member.nickname }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              v-for="i in item.score"
              :key="i + '1'"
              class="iconfont icon-wjx01"
            ></i>
            <i
              v-for="i in 5 - item.score"
              :key="i + '2'"
              class="iconfont icon-wjx02"
            ></i>
            <span class="attr">{{ item.orderInfo.specsText }}</span>
          </div>
          <div class="text">{{ item.content }}</div>
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>
              {{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsCommentImage from './goods-comment-image'
import { findCommentInfoByGoods, findCommentListByGoods } from '@/api/goods'
import { ref, onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImage
  },
  setup () {
    const route = useRoute()
    const { commentInfo } = useCommentInfo()
    const { commentList, changeSort, reqParams } = useCommentList(route.params.id)
    return {
      commentInfo,
      commentList,
      changeSort,
      reqParams
    }
  }
}
function useCommentList (id) {
  const reqParams = reactive({
    page: 1,
    pageSize: 10,
    hasPicture: false, // 是否右图
    sortField: null // 排序: praiseCount -> 最热 createTime -> 最新
  })
  const commentList = ref({})

  async function getList () {
    const data = await findCommentListByGoods(id, reqParams)
    commentList.value = data.result
  }
  function changeSort (value) {
    reqParams.sortField = value
  }
  watch(
    () => reqParams,
    () => {
      getList()
    },
    {
      deep: true
    })
  onMounted(() => {
    getList()
  })
  return {
    commentList,
    changeSort,
    reqParams
  }
}

function useCommentInfo () {
  const commentInfo = ref(null)
  const route = useRoute()
  const getComment = async () => {
    const data = await findCommentInfoByGoods(route.params.id)
    commentInfo.value = data.result
  }

  onMounted(() => {
    getComment()
  })
  return { commentInfo }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      flex:1;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
.list {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;
    .user {
      width: 160px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        padding-left: 10px;
        color: #666;
      }
    }
    .body {
      flex: 1;
      .score {
        line-height: 40px;
        .iconfont {
          color: #ff9240;
          padding-right: 3px;
        }
        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>
