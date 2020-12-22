'use strict';
// 第一步：创建数据库（unicloud）的引用 
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const { user_id,type } = event
	let matchObj = {}
	if(type !== 'all'){
		matchObj={
			current : true
		}
	}
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	// label_ids = 【'我的标签的id'】
	// 第二步： 查找表名 获取数据   获取label表的数据
	let label = await db.collection('label')
	.aggregate()
	.addFields({
		current:$.in(['$_id',$.ifNull([userinfo.label_ids,[]])])
	})
	.match(matchObj)
	.end()
	// 第三步：返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功，tab',
		data:label.data,
		coutton:label.affectedDocs
	}
};
