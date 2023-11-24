// vuex模块化
// 计算组件的相关配置
export default {
    // 只有namespaced为true，mapstate和mapMutations才能指定哪个模块的配置
    namespaced: true,
    actions: {
        jiaOdd(content, value) {
            if (content.state.sum % 2) {
                content.commit('JIA', value);
            }
        },

        jiaWait(content, value) {
            setTimeout(() => {
                content.commit('JIA', value);
            }, 500);
        }
    },
    mutations: {
        JIA(state, value) {
            console.log('调用函数JIA');
            state.sum += value;
        },
        JIAN(state, value) {
            console.log('调用函数JIAN');
            state.sum -= value;
        },
    },
    state: {
        sum: 0, //当前的和
        school: '广东白云学院',
        subject: 'vue',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    },
}
