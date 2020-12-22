// 例表所有相关的
import $http from '../http.js'

// 获取上方标签
export const get_label = (data) =>{
	return $http({
		url:'get_label',
		data
	})
}
// 获取标签对应列表
export const get_list = (data) =>{
	return $http({
		url:'get_list',
		data
	})
}
// 更新是否喜欢
export const unpdate_like = (data) =>{
	return $http({
		url:'unpdate_like',
		data
	})
}
// 获取搜索列表
export const get_search = (data) =>{
	return $http({
		url:'get_search',
		data
	})
}
// 更新标签
export const update_label = (data) =>{
	return $http({
		url:'update_label',
		data
	})
}
// 获取文章内容 文章/关注/点赞/
export const get_detail = (data) =>{
	return $http({
		url:'get_detail',
		data
	})
}
// 上传评论
export const update_comment = (data) =>{
	return $http({
		url:'update_comment',
		data
	})
}
// 获取评论
export const get_comments = (data) =>{
	return $http({
		url:'get_comments',
		data
	})
}
// 关注/取消  作者
export const update_author = (data) =>{
	return $http({
		url:'update_author',
		data
	})
}
// 是否点赞 文章
export const update_thumbs = (data) =>{
	return $http({
		url:'update_thumbs',
		data
	})
}
// 获取文章喜欢的例表
export const get_follow = (data) =>{
	return $http({
		url:'get_follow',
		data
	})
}

// 获取关注作者的信息
export const get_auhtor = (data) =>{
	return $http({
		url:'get_auhtor',
		data
	})
}
// 获取用户信息
export const get_user = (data) =>{
	return $http({
		url:'get_user',
		data
	})
}
// 获取我的文章
export const get_my_article = (data) =>{
	return $http({
		url:'get_my_article',
		data
	})
}

// 上传意见反馈到云数据库
export const update_feedback = (data) =>{
	return $http({
		url:'update_feedback',
		data
	})
}


