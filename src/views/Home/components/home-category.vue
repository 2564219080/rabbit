<template>
  <div class="home-category">
    <!-- 正式数据渲染 -->
    <template v-if="list.length > 0">
      <ul class="menu">
        <li
          v-for="item in list"
          :key="item.id"
        >
          <RouterLink to="/">{{ item.name }}</RouterLink>
          <!--
          在vue3里面
          template 只有俩种情况使用
           1. 根据某个状态渲染多个模板的  v-if v-else
           2. 插槽的场景    <tempalte #default></template>  <tempalte #footer></template>
         -->
          <template v-if="item.children.length > 0">
            <RouterLink v-for="i in item.children" :key="i.id" to="/">{{
              i.name
            }}</RouterLink>
          </template>
          <!-- 弹层layer位置 -->
          <div class="layer">
            <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
            <ul>
              <li v-for="i in item.goods" :key="i.id">
                <RouterLink to="/">
                  <img :src="i.picture" alt="" />
                  <div class="info">
                    <p class="name ellipsis-2">
                      {{ i.name }}
                    </p>
                    <p class="desc ellipsis">{{ i.desc }}</p>
                    <p class="price"><i>¥</i>{{ i.price }}</p>
                  </div>
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </template>
    <!-- 骨架屏占位 -->
    <template v-else>
      <ul class="menu">
        <li v-for="i in 9" :key="i">
          <XtxSkeleton
            width="40"
            height="20"
            style="margin-right: 5px"
            bgColor="rgba(255,255,255,0.2)"
          />
          <XtxSkeleton
            width="50"
            height="20"
            bgColor="rgba(255,255,255,0.2)"
            style="margin-right: 5px"
          />
          <XtxSkeleton width="50" height="20" bgColor="rgba(255,255,255,0.2)" />
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children.slice(0, 2),
          goods: item.goods
        }
      })
    })
    return {
      list
    }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover {
        background: @xtxColor;
        cursor: pointer;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            &:nth-child(3n) {
              margin-right: 0;
            }
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              &:hover {
                background: #e3f9f4;
              }
              img {
                width: 95px;
                height: 95px;
              }
              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;
                .name {
                  font-size: 16px;
                  color: #666;
                }
                .desc {
                  color: #999;
                }
                .price {
                  font-size: 22px;
                  color: @priceColor;
                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
