<template>
  <div>
    <h3>学生姓名:{{ name }}</h3>
    <h3>学生年龄:{{ age }}</h3>
  </div>
</template>

<script>
// 创建Student组件
export default {
  // 注意一定要用大驼峰命名法
  name: "MyStudent",
  data() {
    return {
      name: "ken",
      age: 18,
    };
  },
};
</script>
