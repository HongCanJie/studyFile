// 该文件主要用于创建整个应用的路由器

// 引入VueRouter
import VueRouter from 'vue-router';
// 引入组件
import About from '../components/About'
import Home from '../components/Home'

// 创建并暴露路由
export default new VueRouter({
    // 注意这里的routes配置要加s并且没有r
    routes: [{
        path: '/about',
        component: About
    }, {
        path: '/home',
        component: Home
    }]
})