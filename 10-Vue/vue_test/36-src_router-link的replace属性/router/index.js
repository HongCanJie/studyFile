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
                        path: 'detail',
                        component: Detail,

                        // 路由的props的第一种写法，值为对象，该对象中所有的key-value都会以props的形式传给Detail组件
                        // props: { a: 1, b: 'hello' },//传递过去的是死数据，很少用

                        // props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传递给Detail组件
                        // props: true //常用

                        // props的第三种写法，值为函数（param和query参数都可以）
                        props($route) {
                            return {
                                id: $route.query.id,
                                title: $route.query.title,
                            }
                        }//常用

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