<template>
	<view class="home">
		<!-- 自定义导航栏 和搜索框 -->
		<navbar></navbar>
		<!-- 自定义tabbar -->
		<tab :list="tabList" @tab='tab' :tabIndex="tabIndex"></tab>
		<!-- 下边的卡片内容 -->
		<view class="home-list">
			<list :tab="tabList" @change="change" :activeIndex="activeIndex"></list>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	// easyCom  =》 如果组件路径是这种的 components/组件名/组件名.vue  则无需引入 注册 局部引入   
	export default {
		data() {
			return {
				title: 'Hello',
				tabList:[],
				tabIndex:0,
				activeIndex:0
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		watch:{
			userinfo(newval){
				this.getLabel()
			}
		},
		onLoad() {
			uni.$on('labelChange',(res) => {
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
		},
		methods: {
			getLabel(){
				this.$api.get_label().then(res => {
					// console.log(res.data,'请求数据分类')
					res.data.unshift({
						name:'全部'
					})
					this.tabList= res.data
				})
			},
			tab({data,index}){
				this.activeIndex = index
			
				console.log(data,index,1111)
			},
			change(current){
				this.tabIndex = current
				this.activeIndex = current
				console.log(this.tabIndex,'当前swiper滑动的值')
				console.log(this.activeIndex,'当前滑动的值')
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;display: flex;
		.home{ 
			display: flex;flex-direction: column;flex: 1;
			overflow: hidden;
			.home-list{ flex: 1;box-sizing: border-box; }
		}
	}
</style>
