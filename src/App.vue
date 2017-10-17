<template>
  <div id="app">
  	<v-nav v-if="route !== 'Login'"></v-nav>
  	<v-sidebar v-if="route !== 'Login'"></v-sidebar>
  	<div class="content">
    	<router-view/>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return {
  		
  	}
  },
  computed: {
  	route: function(){
  		return this.$route.name;
  	}
  }
}
</script>

<style lang="stylus" scoped>
.content
  padding-top: 60px
  margin-left: 190px
</style>
