'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id
	} = event
	
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids
	const lists = await db.collection('article')
					.aggregate()
					.addFields({
						is_like:$.in(['$_id',article_likes_ids])
					})
					.project({
						content:0
					})
					.match({
						is_like:true
					})
					.end()

	
	//返回数据给客户端
	return {
		code:200,
		msg:'请求文章喜欢例表，数据',
		data:lists.data,
		coutton:lists.affectedDocs
	}
};
