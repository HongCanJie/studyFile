<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "School",
  data() {
    return {
      name: "广东白云学院",
      address: "广东广州",
    };
  },
  mounted() {
    // this.$bus.$on("hello", (data) => {
    //   console.log("school收到了数据：" + data);
    // });
    // 订阅消息
    this.pubId = pubsub.subscribe("hello", (msgName, data) => {
      console.log("school收到了数据：" + data);
    });
  },
  beforeDestroy() {
    // this.$bus.$off("hello");
    // 取消订阅
    // 组件实例被销毁前取消订阅(注意：取消订阅是取消订阅变化的id)
    pubsub.unsubscribe(pubId);
  },
};
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
  margin-top: 15px;
}
</style>
