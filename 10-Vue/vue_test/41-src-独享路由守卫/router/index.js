// 该文件主要用于创建整个应用的路由器

// 引入VueRouter
import VueRouter from 'vue-router';
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import Message from '../pages/Message'
import News from '../pages/News'
import Detail from '../pages/Detail'

// 创建路由
const router = new VueRouter({
    // 注意这里的routes配置要加s并且没有r
    routes: [{
        name: 'guanyu',//路由名
        path: '/about',//路由路径
        component: About,//路由显示的组件
        meta: { title: '关于' },//程序员自定义的参数

    }, {
        name: 'zhuye',
        path: '/home',
        component: Home,
        meta: { title: '主页' },
        // 嵌套路由中的子路由 children
        // 注意：子路由中的path不加 /,脚本会自己遍历加进去
        children: [
            {
                name: 'xiaoxi',
                path: 'message',
                component: Message,
                meta: { isAuth: true, title: '消息' },
                // 独享路由守卫--某个路由独有的守卫功能（没有后置）
                beforeEnter: (to, from, next) => {
                    if (to.meta.isAuth) {
                        if (localStorage.getItem('school') === '广东白云学院') {
                            next();
                        } else {
                            alert('输入的学校名不符,无权查看!');
                        }
                    } else {
                        next();
                    }
                },
                children: [
                    {
                        // 把路由命名可以简化路径的书写格式(适用于三级以及三级以上的路由)
                        name: 'xiangqing',
                        path: 'detail',
                        component: Detail,
                        meta: { title: '详情' },

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
                name: 'xinwen',
                path: 'news',
                component: News,
                // 定义是否需要权限、标题名字
                meta: { isAuth: true, title: '新闻' }
            }
        ]
    }]
})

// 全局前置路由守卫--初始化的时候被调用或每次路由切换之前被调用
// router.beforeEach((to, from, next) => {
//     // console.log('全局前置路由守卫', to, from, next);
//     if (to.meta.isAuth) {
//         if (localStorage.getItem('school') === '广东白云学院') {
//             next();
//         } else {
//             alert('输入的学校名不符,无权查看!');
//         }
//     } else {
//         next();
//     }
// })

// 全局后置路由守卫--初始化的时候被调用或每次路由切换之后被调用
router.afterEach((to, next) => {
    // console.log('全局后置路由守卫', to, next);
    document.title = to.meta.title || '硅谷系统';//修改标题
})

// 暴露路由
export default router;