<template>
  <div>
    <!-- 外部传入属性值 -->
    <!-- 使用v-bind可以将值以表达式的方式读取 -->
    <Student name="ken" :age="22" sex="男" />
  </div>
</template>

<script>
// 导入子组件
import Student from "./components/Student.vue";

// 创建并暴露App组件
export default {
  name: "App",
  components: {
    Student,
  },
};
</script>