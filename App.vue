<script>
	export default {
		onLaunch: function() {
			// 异步操作，
			this.$api.get_user({
				user_id:'5fa0fa2875dc5d00010535f0'
			}).then(res => {
				const { data } = res
				this.$store.dispatch('set_userinfo',data)
				// console.log(res)
			})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css';
</style>
