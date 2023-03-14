import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'

// 创建一个axios实例
const instance = axios.create({
  baseURL,
  timeout: 5000
})
// 请求拦截器
instance.interceptors.request(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地有token就在头部携带
//   1.获取用户信息
  const { profile } = store.state.user
  //   2.判断是否有token
  if (profile.token) {
    // 3.有token设置token
    config.headers.Authorization = profile.token
  }
  //   一定要返回config
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
instance.interceptors.response(res => {
  // 对返回的数据进行处理避免层层嵌套
  return res.data
}, err => {
  // 出现401状态码的时候进入该函数
  // 例如出现token过期的情况
  if (err.response && err.response.status === 401) {
    // 1. 清空无用的用户信息
    store.commit('user/setProfile', {})
    // 当前路由地址
    // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
    // 使用fullPath能够保证路由中的数据不丢失
    // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
    const fullPath = router.currentRoute.value.fullPath
    // 2.跳转到登录页
    // 3.跳转需要传参（当前路由地址）给登录页码
    router.push(`/login?redirectUrl=${fullPath}`)
  }
  return Promise.reject(err)
})

// 导出一个请求工具函数
export default (url, methods, submitData) => {
  return instance({
    url,
    methods,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [methods.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
