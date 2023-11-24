// 引入vue文件
import Vue from 'vue';
// 引入App组件
import App from './App.vue'
// 引入混合
import { hunhe1, hunhe2 } from './mixin.js'
// 关闭生产提示
Vue.config.productionTip = false;

// 全局混合
// Vue.mixin(hunhe1);
// Vue.mixin(hunhe2);

// 创建vm
new Vue({
    el: '#app',
    // render作用是将App组件放入到容器中，并且覆盖掉id为app的容器
    render: h => h(App)
})

