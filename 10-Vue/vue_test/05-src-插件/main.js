// 引入vue文件
import Vue from 'vue';
// 引入App组件
import App from './App.vue'
// 引用插件
import plugins from './plugins';
// 关闭生产提示
Vue.config.productionTip = false;

// 使用插件
Vue.use(plugins);

// 创建vm
new Vue({
    el: '#app',
    // render作用是将App组件放入到容器中，并且覆盖掉id为app的容器
    render: h => h(App)
})

