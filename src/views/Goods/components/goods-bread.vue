<template>
  <xtx-bread v-if="goods.categories">
    <xtx-bread-item to="/">
      首页
    </xtx-bread-item>
    <xtx-bread-item :to="`/category/${goods.categories[1].id}`">
      {{goods.categories[1].name}}
    </xtx-bread-item>
    <xtx-bread-item :to="`/category/sub/${goods.categories[0].id}`">
      {{goods.categories[0].name}}
    </xtx-bread-item>
    <xtx-bread-item >
      {{goods.name}}
    </xtx-bread-item>
  </xtx-bread>
</template>

<script>

export default {
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>
