<template>
  <div class="home-banner">
    <XtxSlider :sliders="bannerList"/>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { ref, onMounted } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const bannerList = ref([])
    async function loadBannerList () {
      const res = await findBanner()
      bannerList.value = res.result
    }
    onMounted(() => {
      loadBannerList()
    })
    return {
      bannerList
    }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
