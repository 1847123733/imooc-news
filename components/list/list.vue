<template>
	<swiper class="home-swiper" @change="change" :current='activeIndex'>
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :list="listCatchData[index]" @loadmore='loadmore' :load="load[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components:{
			listItem
		},
		props:{
			tab:{
				type:Array,
				default(){
					return []
				}
			},
			activeIndex:{
				type:Number,
				default(){
					return 0
				}
			}
		},
		data() {
			return {
				list:[],
				listCatchData:{},
				load:{},
				pageSize:10
			}
		},
		methods:{
			change(e){
				let current = e.detail.current
				// 滑动（手动也触发）swiper 获取到 当时的 tab的项
				// console.log(this.tab[current].name)
				this.$emit('change',current)
				// 当数据不存在，长度为0的时候，才请求数据
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0){
					this.getList(current)
				}
				
			
			},
			getList(current){
				if(!this.load[current]){
					this.load[current] = {
						page : 1,
						loading : 'loading'
					}
				}
				
				this.$api.get_list({
					name:this.tab[current].name,
					page:this.load[current].page,
					pageSize:this.pageSize
				}).then(res => {
					// this.list = res.data
					// this.listCatchData[current] = res.data;
					// 数据的懒加载 
					if(res.data.length === 0){
						let oldLoad = {}
						oldLoad.loading = "noMore"
						oldLoad.page = this.load[current].page
						this.$set(this.load,current,oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[current]  || []
					oldList.push(...res.data)
					
					this.$set(this.listCatchData,current,oldList)
					console.log(res)
				})
			},
			loadmore(){
				if(this.load[this.activeIndex].loading === "noMore") return
				// list-item组件上拉加载 更多
				this.load[this.activeIndex].page++
				
				this.getList(this.activeIndex)
		
				
				console.log('触发上拉')
				console.log(this.activeIndex,this.load[this.activeIndex].page)
			}
		},
		watch:{
			tab(newVal){
				if(newVal.length === 0) return
				this.listCatchData = {}
				this.load	 = {}
				this.getList(this.activeIndex)
			}
		},
		// onload 在页面  ， created 组件中
		created() {
			uni.$on('update_article', (e) => {
				// console.log(e,'主页刷新')
				if(e === 'follow') {
					this.listCatchData = {}
					this.load = {}
					this.getList(this.activeIndex)
				}
			})
			// todo tab 还没有赋值
			// this.getList(0)
		}
	}
</script>

<style lang="scss">
	.home-swiper{
		height: 100%;
		.swiper-item{ 
			height: 100%;overflow: hidden;
			.list-scroll{ height: 100%; }
		}
	}
</style>
