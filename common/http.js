// 封装我们的网络请求
import store from '../store/index.js'
export default function $http(options){
	
	const { url,data } = options
	
	const dataObj = {
		user_id:store.state.userinfo._id,
		...data
	}
	return new Promise((reslove,reject) => {
		uniCloud.callFunction({
			// name名就是我们云函数的名字
			name:url,
			data:dataObj
		}).then(res => {
			if(res.result.code === 200){
				reslove(res.result)
			}else{
				reject(res.result)
			}
		}).catch(err => {
			// 云函数调用失败
			reject(err)
		})
	})
}