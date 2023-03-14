// 用于储存用户信息
export default {
  namespaced: true,
  // 子模块的state最好写成函数模式
  state: () => {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }

    }
  },
  mutations: {
    setProfile (state, payload) {
      // playload就是外界传进来的信息
      state.profile = payload
    }
  },
  actions: {

  }
}
