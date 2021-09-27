import { userAccountLogin } from '@/api/user'
export default {
  namespaced: true,
  state: () => ({
    profile: {
      id: '',
      account: '',
      nickname: '',
      avatar: '',
      token: '',
      mobile: ''
    }
  }),
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    },
    clearProfile (state) {
      state.profile = {}
    }
  },
  actions: {
    async asyncSetUser (context, { account, password }) {
      const res = await userAccountLogin({ account, password })
      context.commit('setUser', res.result)
      console.log(res.code)
      return res.code
    }
  }
}
