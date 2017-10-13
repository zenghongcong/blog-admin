<template>
  <div class="login center">
  	<h1>博客后台登录</h1>
    <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
    <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
   		form: {
     		name: '',
     		password: ''
     	}
    }
  },
  methods: {
  	login(){
  		this.$http.post('/auth/user/login', this.form)
  		.then((res) => {
  			if(res.status == 200){
  				sessionStorage.setItem('token', res.token)
  				this.$router.push('/article')
  			}else{
  				sessionStorage.setItem('token', null)
  			}
  		}, (err) => {
  			sessionStorage.setItem('token', null)
  		})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.login
  top: -15%
  width: 400px
  height: 275px
  padding: 20px 20px
  box-shadow: 0 0 16px rgba(0,0,0,.2)
  border-radius: 6px
  h1
    font-size: 22px
    margin-bottom: 10px
    font-weight: normal
  .el-input
    margin-bottom: 25px
  button
    width: 100%
    height: 40px
</style>
