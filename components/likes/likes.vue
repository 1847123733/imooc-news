<template>
	<view class="icons" @click.stop="likeTap" >
		<uni-icons :type="like? 'heart-filled':'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			},
			types:{
				type:String,
				default: ''
			}
		},
		data() {
			return {
				like:false
			};
		},
		watch:{
			item(newVal){
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods:{
			likeTap(){
				this.like = !this.like
				// 点击的收藏按钮
				// console.log(this.item)
				this.setUpdateLikes()
			},
			setUpdateLikes(){
				uni.showLoading()
				
				this.$api.unpdate_like({
					user_id:'5fa0fa2875dc5d00010535f0',
					artice_id:this.item._id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title:this.like ? '收藏成功' : '取消收藏',
						icon:'none'
					})
					uni.$emit('update_article',this.types)
					// console.log(res,'收藏成功')
				}).catch(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
.icons{ 
	display: flex;justify-content: center;align-items: center;
	width: 20px;height: 20px;
	position: absolute;right: 0;top: 0;
};
</style>
