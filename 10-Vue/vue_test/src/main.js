// 引入vue文件
import Vue from 'vue';
// 引入App组件
import App from './App.vue'
// 引入使用的组件
import { Rate, Steps, Step, Col, Result } from 'element-ui';

// 引入组件
// import ElementUI from 'element-ui';
// 引入element全部样式
// import 'element-ui/lib/theme-chalk/index.css';
// 关闭生产提示
Vue.config.productionTip = false;

// 使用脚本
// Vue.use(ElementUI);

// 全局定义组件
Vue.component(Rate.name, Rate);
Vue.component(Steps.name, Steps);
Vue.component(Step.name, Step);
Vue.component(Col.name, Col);
Vue.component(Result.name, Result);

// 创建vm
new Vue({
    el: '#app',
    // render作用是将App组件放入到容器中，并且覆盖掉id为app的容器
    render: h => h(App),
})

