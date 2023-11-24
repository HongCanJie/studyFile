<template>
  <div>
    <h3>学生姓名:{{ name }}</h3>
    <h3>学生年龄:{{ age }}</h3>
  </div>
</template>

<script>
// 创建Student组件
export default {
  name: "Student",
  data() {
    return {
      name: "ken",
      age: 18,
    };
  },
};
</script>
