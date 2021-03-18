import axios from 'axios'
import Vue from "vue";

//import mapGetters from '@/store/getters'

axios.defaults.withCredentials = true

export function request(config) {
  //创建axios实例
  const instance = axios.create(
    {
      baseURL: 'http://localhost:8182',
      timeout: 10000,
      crossDomain: true,
    }
  )

  //请求拦截器
  instance.interceptors.request.use(config => {
    // 每次请求发送之前将token携带到请求头中，此处有bug,弃用勿删
    // config.headers={'token':mapGetters.token()}
    // config.headers.token=Vue.prototype.$store.state.token

    return config
  }, err => {
    console.log("axios请求拦截器中的err: " + err);
  })

  //响应拦截器
  instance.interceptors.response.use(res => {
    console.log("响应拦截器中的状态码: " + res.status);
    if (res.data.code === 404) {
      // 不提示信息，直接返回res
    }else if (res.data.code !== 200) {
      Vue.prototype.$message.error(res.data.message)
    }
    return res;

  }, err => {
    console.log("响应拦截器中的错误信息: " + err);
    Vue.prototype.$message.error(err);
  })

  return instance(config)
}
