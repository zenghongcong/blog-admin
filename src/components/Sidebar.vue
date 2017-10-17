<template>
	<div class="sidebar">
		<ul>
			<li v-for="it in navList">
				<router-link :to="it.link">{{it.name}}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Sidebar',
		data() {
			return {
				navList: [{
					name: '文章管理',
					link: 'article'
				}, {
					name: '分类管理',
					link: 'category'
				}, {
					name: '用户管理',
					link: 'user'
				}]
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.sidebar
  position: fixed
  top: 0
  left: 0
  bottom: 0
  width: 190px
  padding-top: 60px
  border-right: 1px solid #e5e5e5
  background: #f2f2f2
  ul li
    border-bottom: 1px solid #e5e5e5
    a
      position: relative
      display: block
      padding: 12px 5px
      color: #585858
      &.router-link-active
        background: #fff
        color: #2B7DBC
</style>
