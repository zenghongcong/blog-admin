<template>
  <div class="sidebar">
  	<ul>
  		<li v-for="it in navList">
  			<a :href="it.link">{{it.name}}</a>
  		</li>
  	</ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
   		navList: [
   			{
   				name: '文章管理',
   				link: '#/article'
   			},
   			{
   				name: '分类管理',
   				link: '#/category'
   			},
   			{
   				name: '用户管理',
   				link: '#/user'
   			}
   		]
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
  background: #f2f2f2
</style>
