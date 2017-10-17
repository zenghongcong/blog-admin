// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueQuillEditor from 'vue-quill-editor'
import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.prototype.$http = Axios
Vue.component('v-nav', Nav);
Vue.component('v-sidebar', Sidebar);
Vue.config.productionTip = false

Vue.filter('date', (value, formatter) => {
	let time = new Date(value),
		y = time.getFullYear(),
		m = time.getMonth() + 1,
		d = time.getDate(),
		h = time.getHours(),
		mm = time.getMinutes(),
		s = time.getSeconds();
		
	return formatter === 'y-m-d' ? y + '-' + m + '-' + d : y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
})

router.beforeEach((to, from, next) => {
	let token = sessionStorage.getItem('token')
	if(to.path == '/login'){
		if(token != 'null' && token != null){
			next('/article')
		}else{
			next()
		}
	}else{
		if(token != 'null' && token != null){
			next()
		}else{
			next('/login')
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
