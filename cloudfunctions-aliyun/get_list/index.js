'use strict';
// 第一步：创建数据库（unicloud）的引用 
const db = uniCloud.database()
// 聚合的操作符
const $ = db.command.aggregate
exports.main = async (event, context) => {
	// 接受分类，通过分类去筛选数据
	const { 
			user_id,
			name,
			page = 1,
			pageSize = 10 
		} = event
	// 采用聚合  ： 更精细化的去处理数据  :  求和、分组、指定那些字段
	// aggregate =》 拿到article这个表的实列
	// addFields =》 追加字段   追加一个is_like的字段
	// match  => 筛选数据 classify = 传来的名字 ， 在把数据交给下一个流水线
	// project =》 作用和field 一样，可以指定某一些字段返回，也可以不返回   =》  0 和false 表示不传递
	// end =>  结束筛选 ，进行聚合实列操作
	let matchObj = {}
	if(name !== '全部'){
		matchObj = {
			classify:name
		}
	}
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids
	
	
	const list =  await db.collection('article')
		.aggregate()
		.addFields({
			is_like:$.in(['$_id',article_likes_ids])
		})
		.match(matchObj)
		.project({
			content:false
		})
		// 要跳过多少数据  1 = 0 不跳过  2 = 10  跳过10条，从11开始
		.skip(pageSize*(page-1))
		.limit(pageSize)
		.end()
	
	// 第二步： 查找表名 获取数据   获取article表的数据
	/* let list = await db.collection('article')
	// field  指定返回的字段  
	.field({
		// true 值返回这个字段，false 不返回
		content:false
	})
	.get() */
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功，卡片的数据',
		data:list.data,
		coutton:list.affectedDocs
	}
};
