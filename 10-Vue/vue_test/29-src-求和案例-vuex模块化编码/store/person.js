import axios from "axios";
import { nanoid } from "nanoid";

// 人员管理组件的相关配置
export default {
    namespaced: true,
    actions: {
        addPersonWang(content, value) {
            console.log("调用函数addPersonWang");
            if (value.name.indexOf('王') === 0) {
                content.commit('ADD_PERSON', value);
            } else {
                alert("请输入姓王的人！");
            }
        },
        addPersonServer(content) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                success => {
                    const personObj = { id: nanoid(), name: success.data };
                    content.commit('ADD_PERSON', personObj);
                },
                error => {
                    alert(error.message);
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            // 首位插入
            state.personList.unshift(value);
            console.log("调用函数ADD_PERSON");
        }
    },
    state: {
        personList: [{ id: 1, name: "张三" }]
    },
    getters: {
        firstPersonName(state) {
            console.log("调用函数firstPersonName");
            return state.personList[0].name
        }
    },
}

