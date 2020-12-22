'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const { user_id = '' } = event
	if(!user_id){
		return{
			code:201,
			msg:'用户信息获取失败'
		}
	}
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	//返回数据给客户端
	return {
		code:200,
		msg:'用户信息请求成功，个人中心',
		data:userinfo
	}
};
