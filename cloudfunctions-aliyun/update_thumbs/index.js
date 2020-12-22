'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		artice_id
	} = event
	
	const user = await db.collection('user').doc(user_id).get()
	const thumbs_up_article_ids = user.data[0].thumbs_up_article_ids
	
	let thumbs_ids = null;
	let thumbs_shuliang = null
	if(thumbs_up_article_ids.includes(artice_id)){
		// 点赞并取消
		thumbs_ids = dbCmd.pull(artice_id)
		thumbs_shuliang = dbCmd.inc(-1)
		// return {
		// 	code:200,
		// 	msg:'您已经点过赞了',
		// }
	}else{
		thumbs_ids = dbCmd.addToSet(artice_id)
		thumbs_shuliang = dbCmd.inc(1)
	}
	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids:thumbs_ids
	})
	
	await db.collection('article').doc(artice_id).update({
		thumbs_up_count:thumbs_shuliang
	})
	
	//返回数据给客户端
	return {
		code:200,
		msg:'点赞/取消赞，成功',
		
	}
};
