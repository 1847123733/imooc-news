// vuex 状态管理  管理搜索历史
// 每次刷新页面，数据为初始化

import Vue from 'vue'
//  uni-app自带vuex不用安装了
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state:{
		userinfo:uni.getStorageSync('USERINFO') || {},
		historyLists: uni.getStorageSync("__history") || []
	},
	mutations:{
		// 数据用户信息
		SET_USER_INFO(state,userinfo){
			state.userinfo = userinfo
		},
		SET_HISTORY_LIST(state,history){
			state.historyLists = history
		},
		CLEAR_HISTORY(state){
			state.historyLists= []
		}
	},
	actions:{
		set_userinfo({commit},userinfo){
			uni.setStorageSync('USERINFO',userinfo)
			commit('SET_USER_INFO',userinfo)
		},
		set_history({commit,state},history) {
			let list = state.historyLists
			console.log(state.historyLists,2222)
			list.unshift(history)
			uni.setStorageSync('__history',list)
			commit('SET_HISTORY_LIST',list)
		},
		clearHistory({commit}){
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		}
	}
})

export default store