/*
该文件是整个项目的入口文件
*/
// 引入vue文件
import Vue from 'vue'
// 引入app组件，他是所有组件的父组件
import App from './App.vue'
// 关闭vue的生产提示
Vue.config.productionTip = false

/* 
  关于不同版本的Vue：
	
    1.vue.js与vue.runtime.xxx.js的区别：
        (1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
        (2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

    2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
      render函数接收到的createElement函数去指定具体内容。
*/

// 创建vue的实例对象
new Vue({
  // 设置挂载点
  el: '#app',
  //render函数完成了这个功能：将App组件放入容器中
  render: h => h(App)
})

// function n() {

// }

