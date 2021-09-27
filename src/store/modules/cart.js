import { mergeLocalCart, checkAllCart, updateCart, findCartList, insertCart, delectCart } from '@/api/cart'
export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  mutations: {
    insertCartList (state, good) {
      const curItem = state.list.find(item => good.skuId === item.skuId)
      if (curItem) {
        curItem.count += good.count
      } else {
        state.list.unshift(good)
      }
    },
    delCart (state, good) {
      const index = state.list.findIndex(item => item.skuId === good.skuId)
      state.list.splice(index, 1)
    },
    singleCheck (state, { good, selected }) {
      const curItem = state.list.find(item => good.skuId === item.skuId)
      curItem.selected = selected
    },
    allCheck (state, selected) {
      state.list.forEach(item => {
        item.selected = selected
      })
    },
    changeCount (state, { good, count }) {
      const item = state.list.find(item => item.skuId === good.skuId)
      item.count = count
    },
    setList (state, list) {
      state.list = list
    }
  },
  actions: {
    asyncInsertCart (ctx, good) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          insertCart(good).then(() => {
            findCartList().then(res => {
              ctx.commit('setList', res.result)
              resolve()
            })
          })
        } else {
          ctx.commit('insertCart', good)
          resolve()
        }
      })
    },
    asyncDelCart (ctx, good) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          delectCart(good.skuId).then(() => {
            findCartList().then(res => {
              ctx.commit('setList', res.result)
              resolve()
            })
          })
        } else {
          ctx.commit('delCart', good)
          resolve()
        }
      })
    },
    asyncSingleCheck (ctx, { good, selected }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          updateCart({ ...good, selected }).then(() => {
            findCartList().then(data => {
              ctx.commit('setList', data.result)
              resolve()
            })
          })
        } else {
          ctx.commit('singleCheck', { good, selected })
          resolve()
        }
      })
    },
    asyncAllCheck (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const ids = ctx.getters.effectiveList.map(item => {
            return item.skuId
          })
          checkAllCart({ selected, ids }).then(() => {
            findCartList().then(res => {
              ctx.commit('setList', res.result)
            })
          })
        } else {
          ctx.commit('allCheck', selected)
          resolve()
        }
      })
    },
    asyncChangeCount (ctx, { good, count }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          updateCart({ ...good, count }).then(() => {
            findCartList().then(data => {
              ctx.commit('setList', data.result)
              resolve()
            })
          })
        } else {
          ctx.commit('changeCount', { good, count })
          resolve()
        }
      })
    },
    async mergeLocalCart (ctx) {
      if (ctx.state.list.length === 0) {
        return false
      }
      const cartList = ctx.state.list.map(({ skuId, count, selected }) => {
        return {
          skuId, count, selected
        }
      })
      await mergeLocalCart(cartList)
      findCartList().then(res => {
        ctx.commit('setList', res.result)
      })
    }
  },
  getter: {
    effectiveList (state) {
      return state.list.filter(item => item.isEffective === true)
    },
    allCount (state, getters) {
      return getters.effectiveList.reduce((pre, item) => {
        return pre + item.count
      }, 0)
    },
    allPrice (state, getters) {
      return getters.effectiveList.reduce((pre, item) => {
        return pre + (item.count * item.newPrice * 100) / 100
      }, 0)
    },
    selectedList (state) {
      return state.list.filter(item => item.selected)
    },
    allSelectedPrice (state, getters) {
      getters.selectedList.reduce((pre, item) => {
        return pre + (item.count + item.nowPrice * 100) / 100
      }, 0)
    },
    isAll (state, getters) {
      return getters.effectiveList.every(item => item.selected)
    }
  }
}
