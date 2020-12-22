<template>
	<view class="tab">
		<scroll-view scroll-x="true" class="tab-scroll" >
			<view class="tab-scroll__box">
				<view v-for="(item,index) in list" class="tab-scroll__item" :class="{active: activeIndex === index}" :key="index" @click="clickTab(item,index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="open">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			tabIndex:{ 
				type:Number,
				default(){
					return 0
				}
			} 
		},
		// 可以监听 data props 中数据的变化
		watch:{
			tabIndex(newVal){
				this.activeIndex = newVal
				console.log(this.activeIndex,"tab组件")
			}
		},
		data() {
			return {
				activeIndex:0
			};
		},
		methods:{
			open(){
				uni.navigateTo({
					url:'/pages/home-label/home-label'
				})
			},
			clickTab(item,index){
				// console.log(item,index)
				this.activeIndex = index;
				this.$emit('tab',{
					data:item,
					index:index
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab{
		background-color: #fff;border-bottom: 1px solid #f5f5f5;
		width: 100%;box-sizing: border-box;display: flex;
		.tab-scroll{
			flex: 1;overflow: hidden;box-sizing: border-box;
			.tab-scroll__box{
				display: flex;align-items: center;flex-wrap: nowrap;
				height: 45px;box-sizing: border-box;
				.tab-scroll__item{ flex-shrink: 0;padding: 0 10px;color: #333;font-size: 14px; }
				.active{ color: $mk-base-color; }
			}
		}
		.tab-icons{ 
			display: flex;justify-content: center;align-items: center;
			width: 45px;position: relative;
			&::after{ content: '';position: absolute;top: 12px;bottom: 12px;left: 0;width: 1px;background-color: #ddd; }
		}
	}
</style>
