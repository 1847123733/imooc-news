'use strict';
const db = uniCloud.database()
const $ =db.command.aggregate
exports.main = async (event, context) => {
	const { 
		user_id,
		article_id
	} = event
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	let list = await db.collection('article')
		.aggregate()
		.addFields({
			// 是否关注作者
			is_author_like:$.in(['$author.id',user.author_likes_ids]),
			// 是否收藏文章
			is_like:$.in(['$_id',user.article_likes_ids]),
			// 是否点赞
			is_thumbs_up:$.in(['$_id',user.thumbs_up_article_ids])
		})	
		.match({
			_id:article_id
		})
		// 那些字段返回，那些字段不返回
		.project({
			coments:0
		})
		.end()
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功，文章/关注/点赞/',
		data:list.data[0]
	}
};
