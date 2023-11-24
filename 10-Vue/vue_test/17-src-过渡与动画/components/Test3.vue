<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!-- appear页面初始化时播放入场动画 -->
    <!-- name变成hello后，样式也需要变成.hello-enter/leave-active -->
    <transition-group
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__shakeY"
      leave-active-class="animate__backOutUp"
    >
      <h1 v-show="!isShow" key="1">你好啊！</h1>
      <h1 v-show="isShow" key="2">欢迎学习Vue！</h1>
    </transition-group>
  </div>
</template>

<script>
// 引入animate官方样式库
import "animate.css";
export default {
  name: "Test2",
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style scoped>
h1 {
  background-color: orange;
}

/* 进入的起点、离开的终点 */
.hello-enter,
.hello-leave-to {
  transform: translateX(-100%);
}

/* 进入、离开的过程 */
.hello-enter-active,
.hello-leave-active {
  transition: 0.5s linear;
}

/* 进入的终点、离开的起点 */
.hello-enter-to,
.hello-leave {
  transform: translateX(0px);
}
</style>
