// 该文件用于常见vuex中最为核心的store

// 第一步:准备store文件
// 引入vue文件
import Vue from 'vue'
// 引入vuex插件
import Vuex from 'vuex';
// 导入计算模块配置
import CountOptions from './count'
// 导入人员管理模块配置
import PersonOptions from './person'
// 使用Vuex插件
Vue.use(Vuex);


export default new Vuex.Store({
    // vuex模块化配置的时候一定要记得在store配置中加modules！！！
    modules: {
        countAbout: CountOptions,
        personAbout: PersonOptions
    }
})