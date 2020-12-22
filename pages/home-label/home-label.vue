<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editlabel">{{is_edit?'完成':'编辑'}}</view>
			</view>
			<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content__item" v-for="(item,index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons type="clear" size="20" color="red" class="icons-close" v-show="is_edit" @click="del(index)"></uni-icons>
				</view>
				<view class="no-data" v-if="labelList.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>
		
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content__item" v-for="(item,index) in list" :key="item._id" @click="add(index)">
					{{item.name}}
				</view>
			</view>
			<view class="no-data" v-if="list.length === 0 && !loading">
				当前没有数据
			</view>
		</view>
		<!-- <button type="default" @click="test">测试全局发生事件</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit:false,
				labelList:[],
				list:[],
				loading:true
			}
		},
		onLoad() {
			// 自定义事件  => 只能在打开的页面触发
			// 类似于 this.$emit()  => uni.$emit() 全局的发生一些事件
			// uni.$emit('labelChange','参数')
			this.getLabel()
		},
		methods: {
			del(index){
				this.list.push(this.labelList[index])
				this.labelList.splice(index,1)
			},
			add(index){
				if(!this.is_edit)  return
				this.labelList.push(this.list[index])
				this.list.splice(index,1)
			},
			editlabel(){
				// true 正在编辑
				if(this.is_edit){
					this.is_edit = false
					this.setUpdateLabel(this.labelList)
				}else{
					this.is_edit = true
				}
			},
			setUpdateLabel(label){
				let newArrIds = []
				label.forEach(item => {
					newArrIds.push(item._id)
				})
				uni.showLoading()
				// console.log(newArrIds)
				this.$api.update_label({
					label: newArrIds
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title:'更新完成',
						icon:'none'
					})
					uni.$emit('labelChange')
					console.log(res,333)
				})
			},
			getLabel(){
				this.loading = true
				this.$api.get_label({
					type:'all'
				}).then((res) => {
					console.log(res)
					this.labelList = res.data.filter(item => item.current)
					this.list = res.data.filter(item => !item.current)
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	page { background-color: #f5f5f5; }
	.label{
		.label-box{
			background-color: #fff;margin-bottom: 10px;
			.label-header{
				display: flex;justify-content: space-between;font-size: 14px;color: #666;
				padding: 10px 15px;border-bottom: 1px #f5f5f5 solid;
				.label-title{}
				.label-edit{ color: #30b33a;font-weight: bold; }
			}
			.label-content{
				display: flex;flex-wrap: wrap;padding: 15px;padding-top: 0px;
				.label-content__item{ 
					padding: 2px 5px;margin-top: 12px;margin-right: 10px;
					border-radius: 5px;border: 1px #666 solid;font-size: 14px;color: #666;
					position: relative;
					.icons-close{ position: absolute;right: -8px;top: -8px;background-color: #fff;border-radius: 50%; }
				}
			}
		}
	}
	.no-data{ text-align: center;padding: 50px 0;color: #999;font-size: 14px;width: 100%; }
</style>
