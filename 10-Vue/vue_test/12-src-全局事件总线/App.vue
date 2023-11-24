<template>
  <div class="app">
    <h2>{{ msg }}</h2>
    <School />
    <Student />
  </div>
</template>

<script>
// 导入子组件
import School from "./components/School.vue";
import Student from "./components/Student.vue";

// 创建并暴露App组件
export default {
  name: "App",
  components: {
    Student,
    School,
  },
  data() {
    return {
      msg: "你好啊！",
    };
  },
};
</script>

<style >
.app {
  background-color: #dedede;
  padding: 5px;
}
</style>