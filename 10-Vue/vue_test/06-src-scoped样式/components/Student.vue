<template>
  <div class="demo">
    <h2 class="demo1">学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "ken",
      sex: "男",
    };
  },
};
</script>

<style lang="less" scoped>
// lang定义样式语言，默认css；
// scoped作用是让样式在局部生效，一般不写在App组件中
.demo {
  background-color: orange;
  .demo1 {
    color: yellow;
  }
}
</style>
