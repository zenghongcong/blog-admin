import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Article from '@/components/Article'
import Category from '@/components/Category'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
