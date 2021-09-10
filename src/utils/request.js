import axios from 'axios'
import store from '@/store'
import router from '@/router'
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, e => Promise.reject(e))

instance.interceptors.response.use(response => {
  return response.data
}, e => {
  if (e.response && e.response.status === 401) {
    const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + redirectUrl)
  }
  return Promise.reject(e)
})

const request = (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
