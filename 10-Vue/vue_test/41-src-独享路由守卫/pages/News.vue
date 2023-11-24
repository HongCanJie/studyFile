<template>
  <ul>
    <li><h3 :style="{ opacity }">欢迎学习Vue</h3></li>
    <li>news001 <input type="text" /></li>
    <li>news002 <input type="text" /></li>
    <li>news003 <input type="text" /></li>
  </ul>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      opacity: 1,
    };
  },
  // 缓存组件之后就不会再触发beforeDestroy这个钩子了
  // beforeDestroy() {
  //   console.log("News组件即将被销毁");
  //   clearInterval(this.timer);
  // },
  // mounted() {
  //   this.timer = setInterval(() => {
  //     this.opacity -= 0.01;
  //     if (this.opacity <= 0) {
  //       this.opacity = 1;
  //     }
  //   }, 16);
  // },

  // 路由器独有的生命周期钩子
  // 作用：当组件已经被缓存，即无法销毁的时候，但是组件里面某些功能需要操作停止等，这可以调用这两个钩子
  // 激活
  activated() {
    this.timer = setInterval(() => {
      // console.log(111);
      this.opacity -= 0.01;
      if (this.opacity <= 0) {
        this.opacity = 1;
      }
    }, 16);
  },
  // 失活
  deactivated() {
    clearInterval(this.timer);
  },
};
</script>