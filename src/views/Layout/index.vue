<template>
  <TopNav/>
  <LayoutHeader/>
  <HeaderSticky/>
  <main>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </main>
  <LayoutFooter/>
</template>

<script>
import TopNav from './components/top-nav'
import LayoutHeader from './components/layout-header'
import LayoutFooter from './components/layout-footer'
import HeaderSticky from './components/header-sticky'
export default {
  name: 'xtx-layout',
  components: {
    TopNav,
    LayoutHeader,
    LayoutFooter,
    HeaderSticky
  }
}
</script>

<style>

</style>
