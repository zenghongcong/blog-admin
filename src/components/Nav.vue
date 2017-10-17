<template>
  <header>
  	<a class="logo fl" href="#/article">Blog Admin</a>
  	<div class="user-info fr">
  		<span class="name">{{user}}</span><span class="gap">|</span><span class="logout" @click="logout">退出</span>
  	</div>
  </header>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
   		user: localStorage.getItem('user')
    }
  },
  methods: {
  	logout(){
  		sessionStorage.setItem('token', null)
  		localStorage.setItem('user', null)
  		this.$router.push('/login')
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
header
  position: fixed
  z-index: 11
  top: 0
  left: 0
  width: 100%
  height: 60px
  padding: 0 20px
  background: #438EB9
  .logo
    display: block
    line-height: 60px
    font-size: 20px
    color: #fff
  .user-info
    font-size: 16px
    line-height: 60px
    color: #fff
    .name
      font-size: 18px
    .gap
      margin: 0 15px
    .logout
      cursor: pointer
</style>
