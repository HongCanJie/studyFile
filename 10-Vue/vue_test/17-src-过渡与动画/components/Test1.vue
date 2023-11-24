<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!-- appear页面初始化时播放入场动画 -->
    <transition appear>
      <h1 v-show="isShow">你好啊！</h1>
    </transition>

    <!-- name变成hello后，样式也需要变成.hello-enter/leave-active -->
    <!-- <transition appear name="hello">
      <h1 v-show="isShow">你好啊！</h1>
    </transition> -->
  </div>
</template>

<script>
export default {
  name: "Test1",
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

.v-enter-active {
  animation: ken 0.5s linear;
}
.v-leave-active {
  animation: ken 0.5s linear reverse;
}
@keyframes ken {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
