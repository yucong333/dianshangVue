import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './eleme/eleme'
import './assets/css/style.css'


Vue.config.productionTip = false
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
    // https://www.liulongbin.top:8888/api/private/v1/
    // http://timemeetyou.com:8889/api/private/v1/
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})