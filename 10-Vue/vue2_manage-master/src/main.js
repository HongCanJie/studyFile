import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false


// 全局引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI); 

// 按需引入 使用解构的方式,首字母大写
// import { Container, Aside, Header, Main} from 'element-ui';
// Vue.use(Container)
// Vue.use(Aside)
// Vue.use(Header)
// Vue.use(Main)

import router from './router';  // 会默认读取router/index.js中的内容  创建
// store
import store from './store'
import  './api/mock'
import Cookie from 'js-cookie'

// 添加全局前置导航守卫  重要！！！
router.beforeEach((to, from, next) => {
	// 判断token是否存在 从cookie中读取
	const token = Cookie.get('token')

	// 如果token不存在，说明当前用户是未登录，应该要跳转到登录页面
	if (to.name !== 'Login' && !token) {
		next({ name: 'Login' }) // 跳转到登录页面
	} 
	// 如果token存在并且是登录页面说明已登录，则要跳转到首页（其他页面）
	else if(token && to.name === 'Login') {
		next({name: 'home'})
	} else {
		next()
	}
	
  })



new Vue({
  router, // 挂载
  store,
  
  render: h => h(App),
  created() {
	store.commit('addMenu', router)
  }
}).$mount('#app')
