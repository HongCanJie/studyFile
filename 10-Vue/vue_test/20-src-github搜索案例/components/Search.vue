<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyWord"
      />&nbsp;<button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    searchUsers() {
      // 数据请求回来前的加载界面显示
      this.$bus.$emit("updataListData", {
        isFirst: false,
        isLoading: true,
        errMsg: "",
        users: [],
      });
      // 写法一：使用模板字符串解析模板（es6） 写法二：axios.get("https://api.github.com/search/users?q=" + this.keyWord)
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        (success) => {
          //   console.log("请求成功", success.data.items);
          //组件通信
          //   this.$bus.$emit("getUsers", success.data.items);
          this.$bus.$emit("updataListData", {
            isLoading: false,
            errMsg: "",
            users: success.data.items,
          });
        },
        (error) => {
          //   console.log("请求失败", error.message);
          this.$bus.$emit("updataListData", {
            isLoading: false,
            errMsg: error.message,
            users: [],
          });
        }
      );
    },
  },
};
</script>

<style>
</style>