<template>
	<view>
		<uni-load-more v-if="article.length === 0" status="loading"></uni-load-more>
		<list-card :item="item" v-for="item in article" :key="item.id"></list-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:[]
			}
		},
		onLoad() {
			this.getMyarticle()
		},
		methods: {
			getMyarticle(){
				this.$api.get_my_article().then(res => {
					// console.log(res)
					this.article = res.data
				})
			}
		}
	}
</script>

<style>

</style>
