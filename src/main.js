// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Less from 'less'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'

Vue.use(Toast)

axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  error => Promise.reject(error)
)
axios.interceptors.response.use(
  response => {
    if (response.data.code === 1403) {
      console.log('failed login')
      router.replace('/login')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
