'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const { 
		user_id,
		author_id
		} = event
	
	const user = await db.collection('user').doc(user_id).get()
	const author_likes_ids = user.data[0].author_likes_ids
	
	// 判断当前作者有没有关注
	let author_ids = null
	if(author_likes_ids.includes(author_id)){
		 author_ids = dbCmd.pull(author_id)
	}else{
		// dbCmd.addToSet 如果没有参数则，追加一个，有参数则不做任何操作
		author_ids = dbCmd.addToSet(author_id)
	}
	
	await db.collection('user').doc(user_id).update({
		author_likes_ids: author_ids
	})
	
	//返回数据给客户端
	return {
		code:200,
		msg:'更新成功，关注/取消  作者'
	}
};
