import { createStore } from 'vuex'
// 引入插件实现vuex数据持久化
import createPersistedstate from 'vuex-persistedstate'

import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库 createStore({})
// 创建vuex仓库并导出
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart,
    category
  },
  plugins: [
    createPersistedstate({
      // 默认是储存在localstorage里
      // key是储存数据的键名
      key: 'erabbit-client-pc-store',
      // paths里面的 就是需要持久化的vuex模块
      paths: ['user', 'cart']
    })
  ]
})
