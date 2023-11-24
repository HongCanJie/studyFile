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
    // 父组件销毁后，它的所有子组件以及子组件的自定义事件都会被销毁
    // mounted() {
    //     setTimeout(() => {
    //         this.$destroy();
    //     }, 3000)
    // },
})

