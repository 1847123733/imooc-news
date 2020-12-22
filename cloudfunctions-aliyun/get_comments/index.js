'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
// const dbCmd = db.command

exports.main = async (event, context) => {
	const { 
		user_id,
		article_id,
		 pageSize = 10,
		 page = 1
		 } = event
	let list = await db.collection('article')
		.aggregate()
		.match({
			_id:article_id
		})
		.unwind('$comments')
		.project({
			_id:0,
			comments:1
		})
		.replaceRoot({
			newRoot:'$comments'
		})
		// 要跳过多少数据  1 = 0 不跳过  2 = 10  跳过10条，从11开始
		.skip(pageSize*(page-1))
		.limit(pageSize)
		.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功,评论数据成功',
		data:list.data,
		coutton:list.affectedDocs
	}
};
