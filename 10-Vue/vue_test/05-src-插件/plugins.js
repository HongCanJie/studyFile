export default {
    install(Vue) {
        // 全局过滤器
        Vue.filter('mySlice', (value) => {
            // 截取时间的前四位
            return value.slice(0, 4);
        })

        // 全局自定义指令
        Vue.directive('fbig', {
            // 指令与元素绑定成功时（一上来）
            bind(element, binding) {
                element.value = binding.value;
            },
            // 指令所在元素被插入到页面时
            inserted(element, binding) {
                // 获取焦点
                element.focus();
            },
            // 指令所在的模板被重新解析时
            update(element, binding) {
                element.value = binding.value;
            }
        })

        // 全局混合
        Vue.mixin({
            data() {
                return { x: 100 }
            }
        })

        // 给Vue原型上添加一个方法(vm和vc就能用)
        Vue.prototype.hello = () => {
            alert('你好')
        }

    }
}