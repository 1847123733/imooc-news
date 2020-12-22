<template>
	<view class="scroll">
		<scroll-view scroll-y="true" class="list-scroll" @scrolltolower="loadmore">
			<view class="">
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
				
			}
		}
	}
</script>

<style lang="scss">
	.scroll{ 
		flex: 1;box-sizing: border-box;overflow: hidden; height: 100%;
		.list-scroll{ height: 100%;display: flex;flex-direction: column; }
	}
</style>
