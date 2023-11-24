// 引入vue文件
import Vue from 'vue';
// 引入App组件
import App from './App.vue'
// 关闭生产提示
Vue.config.productionTip = false;

// 创建vm
new Vue({
    el: '#app',
    // render作用是将App组件放入到容器中，并且覆盖掉id为app的容器
    render: h => h(App),
    // 在vm创建完且页面数据还没挂载前，创建全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this;
    }
})

