import Vue from "vue";
import Vuex from 'vuex'
import tab from "./tab";
// Vuex全局注入
Vue.use(Vuex)

// 1.创建vuex实例,对外暴露-》main.js中挂载
export default new Vuex.Store( {
	// 左侧栏和上方tab栏位单独的两个，所以分模块
	modules: {
		tab
	}
})

