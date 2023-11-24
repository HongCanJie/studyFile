<template>
  <div>
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
};
</script>