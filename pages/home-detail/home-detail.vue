<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header__logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header__content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
				
			</view>
			<button type="default" class="detail-header__btn" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="formData.content" :noData="noData"></u-parse>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新的评论</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
					<comments-box  :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box" @click="open">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like? 'heart-filled':'heart' " size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="thumbsup(formData._id)">
					<uni-icons :type="formData.is_thumbs_up ?'hand-thumbsup-filled': 'hand-thumbsup'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header__item" @click="close">取消 </text>
					<text class="popup-header__item" @click="submit">发布 </text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容" />
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				formData:{},
				noData:'<p style="text-align:center;color:#666">详情加载中....</p>',
				// 输入框的值
				commentsValue:'',
				commentsList:[],
				// 回复相关的变量
				replyFormData:{}
			}
		},
		onLoad(query) {
			// onLoad自定义组件还没有渲染完成
			// this.$refs.popup.open()
			this.formData = JSON.parse(query.params)
			
			this.getDetail()
			this.getComments()
			// console.log(this.formData)
		},
		onReady() {
			// onLoad自定义组件还没有渲染完成
			// this.$refs.popup.open()
			// todo
		},
		methods: {
			// 打开评论例表
			open(){
				uni.navigateTo({
					url:'/pages/detail-comments/detail-comments?id=' + this.formData._id
				})
			},
			// 点赞文章
			thumbsup(artice_id){
				this.setUpdateThumbs(artice_id)
			},
			// 收藏文章
			likeTap(artice_id){
				this.setUpdateLike(artice_id)
			},
			// 关注按钮
			follow(author_id){
				
				this.setUpdateAuhtor(author_id)
			},
			// 点击回复按钮
			reply(e){
				this.replyFormData ={
					"comment_id":e.comments.comment_id,		// 评论的id
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id){
					this.replyFormData.reply_id = e.comments.reply_id
				}
				this.openComment()
				console.log(this.replyFormData)
				
			},
			// 打开评论
			openComment(){
				this.$refs.popup.open()
			},
			// 关闭评论
			close(){
				this.$refs.popup.close()
			},
			// 发布评论
			submit(){
				if(!this.commentsValue){
					uni.showToast({
						title:'请输入评论内容',
						icon:"none"
					})
					return
				}
				this.setUpdateComment({
					content:this.commentsValue,
					...this.replyFormData
				})
			},
			// 公布评论api
			setUpdateComment(content){
				const formData = {
					article_id:this.formData._id,
					...content
				}
				uni.showLoading()
				this.$api.update_comment(formData).then(res => {
					// console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:'评论成功',
						icon:"none"
					})
					
					this.getComments()
					this.close()
					this.replyFormData = {}
					this.commentsValue = ''
				})
			},
			// 获取详情信息
			getDetail(){
				this.$api.get_detail({
					article_id:this.formData._id
				}).then(res => {
					const { data } = res
					this.formData = data
					
					console.log(res,'详情信息')
				})
			},
			// 请求评论数据 api
			getComments(){
				this.$api.get_comments({
					article_id:this.formData._id
				}).then(res => {
					this.commentsList = res.data
					// console.log(res)
				})
			},
			// 关注/取消  作者 api
			setUpdateAuhtor(author_id){
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res => {
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.$emit('update_author')
					uni.showToast({
						title:this.formData.is_author_like? '关注作者成功': '取消关注作者',
						icon:"none"
					})
					// console.log(res)
				})
			},
			// 收藏/取消文章
			setUpdateLike(artice_id){
				uni.showLoading()
				this.$api.unpdate_like({
					artice_id
				}).then(res => {
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.$emit('update_article','follow')
					uni.showToast({
						title:this.formData.is_like? '收藏成功':'取消收藏',
						icon:"none"
					})
					// console.log(res)
				})
			},
			// 是否点赞 api
			setUpdateThumbs(artice_id){
				uni.showLoading()
				this.$api.update_thumbs({
					artice_id
				}).then(res => {
						uni.hideLoading()
						this.formData.is_thumbs_up = !this.formData.is_thumbs_up
						if(this.formData.is_thumbs_up){
							this.formData.thumbs_up_count++
							
						}else{
							this.formData.thumbs_up_count--
						}
						uni.showToast({
							title:this.formData.is_thumbs_up? '点赞成功':'取消点赞',
							icon:"none"
						})
					// console.log(res)
				})
			}
		
		}
	}
</script>

<style lang="scss">
	.detail{
		padding: 15px 0;
		padding-bottom: 54px;
		.detail-title{ padding: 0 15px;font-size: 18px;font-weight: bold;color: #333; }
		.detail-header{
			display: flex;align-items: center;margin-top: 10px;padding: 0 15px;
			.detail-header__logo{ 
				width: 40px;height: 40px;border-radius: 50%;overflow: hidden;flex-shrink: 0;
				image{ width: 100%;height: 100%; }
			}
			.detail-header__content{
				width: 100%;display: flex;flex-direction: column;justify-content: space-between;font-size: 12px;padding-left: 10px;
				.detail-header__content-title{ font-size: 14px;color: #333; }
				.detail-header__content-info{ 
					color: #999;
					text{ margin-right: 10px; }
				}
			}
			.detail-header__btn{ flex-shrink: 0;height: 30px;font-size: 12px;background-color: $mk-base-color;color: #fff;line-height: 30px;border-radius: 5px;padding: 0 15 px; }
		}
		.detail-content{ 
			min-height: 500px;margin-top: 20px;
			.detail-html{ padding:0 15px;box-sizing: border-box; }
			.detail-comment{ 
				margin-top: 30px;
				.comment-title{ padding: 10px 15px;font-size: 14px;color: #666;border-bottom: 1px #f5f5f5 solid; }
				.comment-content{ padding: 0 15px;border-top: 1px solid #eee; }
			}
		}
		.detail-bottom{
			position: fixed;bottom: 0;left: 0;background-color: #fff;
			display: flex;align-items: center;
			width: 100%;height: 44px;border-top: 1px #f5f5f5 solid;
			.detail-bottom__input{ 
				display: flex; justify-content: space-between;align-items: center;
				margin-left: 10px; padding: 0 10px;width: 100%;height: 30px;border: 1px #ddd solid;border-radius: 5px;
				text{ font-size: 14px;color: #999; }
			}
			.detail-bottom__icons{ 
				display: flex;flex-shrink: 0;padding: 0 10px;
				.detail-bottom__icons-box{ position: relative;display: flex;align-items: center;width: 44px;justify-content: center; }
			}
		}
	}
	.popup-wrap{
		background-color: #fff;
		.popup-header{
			display: flex;justify-content: space-between;font-size: 14px;color: #666;border-bottom: 1px #f5f5f5 solid;
			.popup-header__item{ height: 50px;line-height: 50px;padding: 0 15px; }
		}
		.popup-content{
			width: 100%;padding: 15px;box-sizing: border-box;
			.popup-textarea{ width: 100%;height: 200px; }
			.popup-count{ display: flex;justify-content: flex-end;font-size: 12px;color: #999; }
		}
	}
</style>
