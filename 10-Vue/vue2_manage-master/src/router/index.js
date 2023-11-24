import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 1.创建路由组件 新在src下新建views文件夹，再此文件夹下新建组件，
// 每个页面作为路由，即新建Home.vue和User.vue, 可以从其他文件 import 进来
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'

import Login from '../views/Login.vue'
// 2.将路由与组件进行映射
const routes = [
	
	{
		// 主路由
		path: '/', 
		component: Main,	
		// 当跳转到首页路径为/时，再重定向跳转到/home
		redirect: '/home',
		name:'Main',
		children:[
			// 子路由  注意这里的path要和CommonAside.vue的path对应
			// { path: 'home', name: 'home', component: Home },//添加相关页面的路由 首页
			// { path: 'user', name: 'user',component: User }, //用户管理
			// { path: 'mall',name: 'mall', component: Mall }, // 商品管理
			// { path: 'page1', name: 'page1',component: PageOne }, // 页面一
			// { path: 'page2', name: 'page2',component: PageTwo }, // 页面二
		]
	},
	// 登录页面和首页是并列的
	{
		path:'/login',
		component:Login,
		name:'Login',
	}
	
  ]


// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
	routes // (缩写) 相当于 routes: routes
  })

export default router  // 将当前实例进行对外暴露导出   输出单个值，使用export default

// 4.创建和挂载到根实例main.js中，通过router配置参数注入路由，
// 从而让整个应用都有路由功能，在App.vue中添加路由出口