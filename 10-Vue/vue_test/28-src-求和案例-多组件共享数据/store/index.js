// 该文件用于常见vuex中最为核心的store

// 第一步:准备store文件
// 引入vue文件
import Vue from 'vue'
// 引入vuex插件
import Vuex from 'vuex';
// 使用Vuex插件
Vue.use(Vuex);
// 准备actions--用于响应组件中的动作
const actions = {
    // content里面可以理解为小型的store
    // jia(content, value) {
    //     content.commit('JIA', value);
    // },
    // jian(content, value) {
    //     content.commit('JIAN', value);
    // },
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
};
// 准备mutations--用于操作数据(state)
const mutations = {
    JIA(state, value) {
        console.log('调用函数JIA');
        state.sum += value;
    },
    JIAN(state, value) {
        console.log('调用函数JIAN');
        state.sum -= value;
    },
    ADD_PERSON(state, value) {
        // 首位插入
        state.personList.unshift(value);
        console.log("调用函数ADD_PERSON");
    }
};
// 准备state--用于存储数据
const state = {
    sum: 0, //当前的和
    school: '广东白云学院',
    subject: 'vue',
    personList: [{ id: 1, name: "张三" }]
};

// 准备getter--用于对数据进行二次加工（类似于computed）
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}


export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})