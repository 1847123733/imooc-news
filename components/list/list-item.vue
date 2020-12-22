<template>
	<list-scroll class="list-scroll" @loadmore='loadmore'>
		<!--ps：微信小程序老版 这里对微信小程序做的适配，微信小程序中for渲染数据，没有数据，所有先渲染的  uni-load-more-->
		<!-- 现在没有事了 -->
		<view >
			<list-card :item="item" v-for="(item,index) in list" :key="index"></list-card>
		</view>
		
		<uni-load-more v-if="list.length ===0 ||  list.length > 6" :status="load.loading || 'loading'" iconType="snow"></uni-load-more>
	</list-scroll>
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
			load:{
				type:Object,
				default(){
					return{
						loading:'loading'
					}
				}
			}
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
	
</script>

<style lang="scss">
	.list-scroll{ height: 100%; }
</style>
