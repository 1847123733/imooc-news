import Vue from 'vue'
import App from './App'
import store from './store'
// 全局引入 调用云函数的api
import api from './common/api'
// 挂载到全局的vue原型上
Vue.prototype.$api = api

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
