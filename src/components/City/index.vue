<template>
  <div class="xtx-city">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span class="placeholder" v-if="!provinceName">请选择配送地址</span>
      <span class="value" v-else>
        {{provinceName}} {{cityName}} {{countyName}}
      </span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <span @click="optionClick(item)" class="ellipsis" v-for="item in filterData" :key="item.code">{{item.name}}</span>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ref, onMounted, reactive, computed, toRefs } from 'vue'
export default {
  name: 'XtxCity',
  setup (porps, { emit }) {
    // 控制展开收起,默认收起
    const active = ref(false)
    // 打开弹框
    function open () {
      active.value = true
    }
    // 关闭弹框
    function close () {
      active.value = false
    }
    // 切换展开收起
    function toggleDialog () {
      if (active.value) {
        close()
      } else {
        open()
      }
    }

    const dataList = ref([])
    function loadCityList () {
      axios({
        url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json',
        method: 'GET'
      }).then(res => {
        dataList.value = res.data
      })
    }
    onMounted(() => {
      loadCityList()
    })

    const changeResult = reactive({
      provinceCode: '', // 省code
      provinceName: '', // 省名称
      cityCode: '', // 城市code
      cityName: '', // 城市名称
      countyCode: '', // 地区code
      countyName: '' // 地区名
    })

    function optionClick (cur) {
      // 把当前传下来的数据赋值到changeResult数据里
      if (cur.level === 0) {
        changeResult.provinceCode = cur.code
        changeResult.provinceName = cur.name
      }
      if (cur.level === 1) {
        changeResult.cityCode = cur.code
        changeResult.cityName = cur.name
      }
      // 当前点击的区
      if (cur.level === 2) {
        changeResult.countyCode = cur.code
        changeResult.countyName = cur.name
      }
      emit('changeCty', changeResult)
    }

    const filterData = computed(() => {
      let _dataList = dataList.value
      if (changeResult.provinceCode) {
        _dataList = dataList.value.find(item => item.code === changeResult.provinceCode).areaList
      }
      if (changeResult.cityCode) {
        _dataList = _dataList.find(item => item.code === changeResult.cityCode).areaList
      }
      if (changeResult.countyCode) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        active.value = false
      }

      return _dataList
    })
    // 这样是次打开选项框重新赋值
    // watch(() => {
    //   return active.value
    // }, (newValue) => {
    //   if (newValue === true) {
    //     for (const key in changeResult) {
    //       changeResult[key] = ''
    //     }
    //     chinaData.value = cacheData
    //   }
    // })

    return { active, toggleDialog, dataList, optionClick, filterData, ...toRefs(changeResult) }
  }
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  margin-left: 10px;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
