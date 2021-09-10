import { findHeadCategory } from '@/api/home'

export default {
  namespaced: true,
  state: () => {
    return {
      list: []
    }
  },
  mutations: {
    setCategory (state, payload) {
      state.list = payload
    }
  },
  actions: {
    async asyncsetCategory (context) {
      const res = await findHeadCategory()
      context.commit('setCategory', res.result)
    }
  }
}
