<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <!-- 配置路径key的时候要写全路径 如：/home/news -->
        <li>
          <!-- replace是替换当前记录(即替换上一次点击的浏览记录，浏览器返回时直接返回到上上次点击时候的记录) -->
          <router-link
            class="list-group-item"
            active-class="active"
            to="/home/news"
            >News</router-link
          >
        </li>
        <li>
          <router-link
            class="list-group-item"
            active-class="active"
            to="/home/message"
            >Message</router-link
          >
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  // beforeDestroy() {
  //   console.log("home组件销毁");
  // },
  // mounted() {
  //   console.log("我是home组件", this);
  //   window.homeRoute = this.$route;
  //   window.homeRouter = this.$rooter;
  // },
};
</script>

