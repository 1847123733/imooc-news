<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length ===0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsList:[],
				article_id:'',
				page:1,
				pageSize:5,
				loading:'loading'
			}
		},
		onLoad(query) {
			this.article_id = query.id
			// "5fa0fa257a68ba00019352ff"
			this.getComments()
			console.log(query,'打开评论页面')
		},
		onReachBottom() {
			// 上拉触动
			// console.log('上拉触动');
			if(this.loading = 'noMore') return
			this.page++
			this.getComments()
		},
		methods: {
			// 请求评论数据 api
			getComments(){
				this.$api.get_comments({
					article_id:this.article_id,
					page:this.page,
					pageSize:this.pageSize
				}).then(res => {
					if(res.data.length === 0){
						this.loading = 'noMore'
						return
					}
					
					// 对象复制，不会影响我们之前的数据
					let old = JSON.parse(JSON.stringify(this.commentsList))
					old.push(...res.data)
					this.commentsList = old
					console.log(res)
				})
			},
		}
	}
</script>

<style lang="scss">
	.comments-content{ 
		padding:  0 15px;
	}
</style>
