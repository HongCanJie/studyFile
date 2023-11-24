<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <input type="text" v-fbig:value="name" />
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
