// 该文件主要用于创建整个应用的路由器

// 引入VueRouter
import VueRouter from 'vue-router';
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import Message from '../pages/Message'
import News from '../pages/News'
import Detail from '../pages/Detail'

// 创建并暴露路由
export default new VueRouter({
    // 注意这里的routes配置要加s并且没有r
    routes: [{
        path: '/about',
        component: About
    }, {
        path: '/home',
        component: Home,
        // 嵌套路由中的子路由 children
        // 注意：子路由中的path不加 /,脚本会自己遍历加进去
        children: [
            {
                path: 'message',
                component: Message,
                children: [
                    {
                        // 把路由命名可以简化路径的书写格式(适用于三级以及三级以上的路由)
                        name: 'xiangqing',
                        // 使用params传递参数必须得用占位符的方式声明变量
                        path: 'detail/:id/:title',
                        component: Detail
                    }
                ]

            },
            {
                path: 'news',
                component: News
            }
        ]
    }]
})