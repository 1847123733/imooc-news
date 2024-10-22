<template>
	<view class="comments-box">
		<view class="comment-header">
			<view class="comment-header__logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header__info">
				<view v-if="!comments.is_reply" class="title">{{comments.author.author_name}}</view>
				<view v-else class="title">{{comments.author.author_name}} <text class="reply-text">回复</text> {{comments.to}}</view>
				
				<view>{{comments.create_time | formatTime}}</view>
			</view>
		</view>
		<view class="comment-content">
			<view>{{comments.comment_content}}</view>
			<view class="comment-info">
				<!-- 将 is_reply 传入，来判断是否是子回复-->
				<view class="comment-btn" @click="commentsReply({comments:comments,is_reply:reply})">回复</view>
			</view>
			<view class="comment-reply" v-for="(item,index) in comments.replys" :key="item.comment_id">
				<!-- 自己调用自己   reply这个属性来判断是否点击的子回复 -->
				<comments-box :reply="true" :comments="item" @reply="commentsReply"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comments-box/comments-box.vue'
	import{ parseTime } from '@/utils/index.js'
	export default {
		// 组件自己调用自己，必须起一个name
		name:'comments-box',
		components:{
			commentsBox
		},
		props:{
			comments:{
				type:Object,
				default (){
					return {}
				}
			},
			// 来判断是否为子回复，false就是主回复
			reply:{
				type:Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		filters:{
			formatTime(time){
				return parseTime(time)
			}
		},
		methods:{
			commentsReply(comment){
				console.log(comment,'点击回复')
				// 为了区分  主回复 还是子回复
				if(comment.is_reply){
					// 子回复
					console.log(1111);
					comment.comments.reply_id = comment.comments.comment_id
					comment.comments.comment_id = this.comments.comment_id
					console.log(this.comments,'子回复的id')
				}
				// console.log(comment)
				this.$emit('reply',comment)
			}
		}
	}
</script>

<style lang="scss">
	.comments-box{
		margin: 15px 0;
		.comment-header{ 
			display: flex;
			.comment-header__logo{
				flex-shrink: 0;width: 30px;height: 30px;border-radius: 5px;overflow: hidden;
				image{ width: 100%;height: 100%; }
			}
			.comment-header__info{
				display: flex;flex-direction: column;padding-left: 15px;font-size: 12px;color: #999;line-height: 1;
				.title{ 
					margin-bottom: 10px;font-size: 14px;color: #333;
					.reply-text{ margin: 0 10px;font-weight: bold;color: #000; }
				}
			}
		}
		.comment-content{ 
			margin-top: 10px;font-size: 14px;color: #000;
			.comment-info{ 
				margin-top: 15px;display: flex;
				.comment-btn{ padding: 2px 10px;font-size: 12px;color: #999;border-radius: 20px;border: 1px #ccc solid; }
			}
			.comment-reply{ display: flex;margin: 15px 0;padding: 0 10px;border: 1px #eee solid; }
		}
	}
</style>
