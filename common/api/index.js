// t统一调取我们云函数的方法
// 获取云函数的方法

// import { get_label,get_list } from './list.js'
// export default {
// 	get_label,
// 	get_list
// }


// 批量导出文件
const requireApi = require.context(
	// 两个参数  api目录的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的一个后缀
	/.js$/
)

let module = {}
// console.log(requireApi.keys(),111111)
requireApi.keys().forEach((key,index) => {
	if(key === './index.js') return
	// console.log(key)
	Object.assign(module,requireApi(key))
})
// console.log(module)
export default module