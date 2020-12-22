<template>
	<view class="navbar">
		<view class="navbar-flxed">
			<!-- 小程序的状态框占位 -->
			<view :style="{height: statusBarHeight +'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :class="{search:isSearch}" :style="{height:navBarHeight + 'px',width:windowWidth+ 'px'}" @click.stop="open">
				<view class="navbar-content__search-icons"  v-if="isSearch" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<!-- 非搜索页显示 -->
				<view v-if="!isSearch" class="navbar-serach">
					<view class="navbar-serach_icon">
						<!-- 使用阿里的矢量图  -->
						<!-- <text class="iconfont icon-sousuo"></text> -->
						<!-- 使用图标插件 -->
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-serach_text">uni-app、vue</view>
				</view>
				<!-- 搜索页显示 -->
				<view v-else class="navbar-serach">
					<input class="navbar-search_text" type="text" v-model="val" placeholder="请输入您要搜索的内容" @input="inputChange" />
				</view>
			</view>
		</view>
		<view :style="{height: (statusBarHeight+ navBarHeight)+ 'px'}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			isSearch:{
				type:Boolean,
				default: false
			},
			value:{
				type:[String,Number],
				default: ''
			}
		},
		data() {
			return {
				statusBarHeight:20,
				navBarHeight:45,
				windowWidth:375,
				val:''
			};
		},
		watch:{
			value(newVal){
				this.val = newVal
			}
		},
		created() {
			// 获取手机系统信息
			const info =  uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight
			// console.log(info)
			this.windowWidth = info.windowWidth
			// console.log(info)
			
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// h5 app mp-alipay 都不支持这个
			// 获取胶囊的位置  小程序的分享，关闭按钮的地方  好像h5没有这个 api
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log(menuButtonInfo)
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			// console.log( this.navBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
		methods:{
			back(){
				// uni.navigateBack()
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			},
			open(){
				if(this.isSearch) return
				uni.navigateTo({
					url:'/pages/home-search/home-search'
				})
			},
			inputChange(e) {
				const {
					value
				} = e.detail

				this.$emit('input', value)
			}
		}
	}
</script>

<style lang="scss">
	@import  '../../common/css/icons.css';
	.navbar{ 
		.navbar-flxed{  
			width: 100%;background-color: $mk-base-color;
			position: fixed;top: 0;left: 0;z-index: 99;
			.navbar-content{
				display: flex;justify-content: center;align-items: center;
				height: 45px;padding: 0 15px;box-sizing: border-box;
				.navbar-serach{ 
					width: 100%;height: 30px;background-color: #fff;padding: 0 10px;
					display: flex;align-items: center;border-radius: 30px;
					.navbar-serach_icon{ margin-right: 10px; }
					.navbar-serach_text{ font-size: 14px;color: #999;width: 100%; }
				}
				&.search{ 
					padding-left: 0;
					.navbar-content__search-icons{ margin-left: 10px;margin-right: 10px; }
					.navbar-serach{ border-radius: 5px; }
				}
			}
			
		}
	}
</style>
