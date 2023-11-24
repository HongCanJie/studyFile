<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <button @click="sendStudentName">把学生的姓名传递给school组件</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "Student",
  data() {
    return {
      name: "ken",
      sex: "男",
    };
  },
  methods: {
    sendStudentName() {
      // console.log(this);
      // 在vm上找到$bus的hello后触发
      // this.$bus.$emit("hello", this.name);
      // 消息发布
      pubsub.publish("hello", this.name);
    },
  },
};
</script>

<style scoped>
.student {
  background-color: orange;
  padding: 5px;
  margin-top: 15px;
}
</style>
