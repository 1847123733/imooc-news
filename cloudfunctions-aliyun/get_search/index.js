'use strict';
// 第一步：创建数据库（unicloud）的引用 
const db = uniCloud.database()
// 聚合的操作符
const $ = db.command.aggregate
exports.main = async (event, context) => {
	// 接受分类，通过分类去筛选数据
	const { 
			user_id,
			value,
		} = event
	// 采用聚合  ： 更精细化的去处理数据  :  求和、分组、指定那些字段
	// aggregate =》 拿到article这个表的实列
	// addFields =》 追加字段   追加一个is_like的字段
	// project =》 作用和field 一样，可以指定某一些字段返回，也可以不返回   =》  0 和false 表示不传递
	// match =》 筛选数据
	// end =>  结束筛选 ，进行聚合实列操作

	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids
	
	
	const list =  await db.collection('article')
		.aggregate()
		.addFields({
			is_like:$.in(['$_id',article_likes_ids])
		})
		.project({
			content:false
		})
		.match({
			title: new RegExp(value)
		})
		.end()

	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功，搜索的数据',
		data:list.data,
		coutton:list.affectedDocs
	}
};
