<template>
  <div>
    <img src="./assets/logo.png" alt="logo" />
    <MySchool></MySchool>
    <MyStudent></MyStudent>
  </div>
</template>

<script>
// 引入组件
import MySchool from "./components/School.vue";
import MyStudent from "./components/Student.vue";

export default {
  name: "App",
  components: {
    MySchool,
    MyStudent,
  },
};
</script>
