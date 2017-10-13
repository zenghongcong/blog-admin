<template>
  <div id="app">
  	<v-nav></v-nav>
  	<v-sidebar></v-sidebar>
  	<div class="content">
    	<router-view/>
  	</div>
  </div>
</template>

<script>
import Vue from 'vue'
import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'

Vue.component('v-nav', Nav);
Vue.component('v-sidebar', Sidebar);

export default {
  name: 'app',
  data(){
  	return {
  		
  	}
  }
}
</script>

<style lang="stylus" scoped>
.content
  padding-top: 60px
  margin-left: 190px
</style>
