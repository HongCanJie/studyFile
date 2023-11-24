// 混合就是将配置或数据与原有组件的配置或数据做一个整合（合并）
// 公用一个配置时使用混合
// 分别暴露
export const hunhe1 = {
    methods: {
        showName() {
            alert(this.name)
        }
    },
    mounted() {
        console.log('你好啊!');
    },
}

export const hunhe2 = {
    data() {
        return {
            x: 100,
            y: 200
        }
    }
}