<template>
  <h2>我是About组件的内容</h2>
</template>

<script>
// 路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹。
export default {
  name: "About",
  // beforeDestroy() {
  //   console.log("about组件销毁");
  // },
  // mounted() {
  //   // 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
  //   // 每个组件都有自己的$route属性，里面存储着自己的路由信息。
  //   // 整个应用只有一个router，可以通过组件的$router属性获取到。
  //   console.log("我是about组件", this);
  //   window.aboutRoute = this.$route;
  //   window.aboutRouter = this.$rooter;
  // },

  // 进入守卫，通过路由规则，进入组件时被调用
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter", to, from);
    if (to.meta.isAuth) {
      if (localStorage.getItem("school") === "广东白云学院") {
        next();
      } else {
        alert("输入的学校名不符,无权查看!");
      }
    } else {
      next();
    }
  },

  // 离开守卫，通过路由规则，离开组件时被调用
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave", to, from);
    next();
  },
};
</script>

