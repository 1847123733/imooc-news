'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		artice_id
	} = event
	// 获取用户表的实列
	// doc 查找id为user_id的
	const userinfo = await db.collection('user').doc(user_id).get()
	// 找到user表的article_likes_ids这个字段
	const artice_id_ids = userinfo.data[0].article_likes_ids
	
	let dbCmdFuns = null
	// 判断他artice_id_ids 是否有传来的这个artice_id
	if(artice_id_ids.includes(artice_id)){
		dbCmdFuns = dbCmd.pull(artice_id)
	}else{
		dbCmdFuns = dbCmd.addToSet(artice_id)
	}
	// addToSet 对数组添加一个
	// pull 对数组删除一个
	 
	await db.collection('user').doc(user_id).update({
		article_likes_ids:dbCmdFuns
	})

	//返回数据给客户端
	return {
		code:200,
		msg:'收藏/不收藏，数据请求成功',
		data:userinfo.data[0]
	}
};
