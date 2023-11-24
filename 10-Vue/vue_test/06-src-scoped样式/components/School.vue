<template>
  <div class="demo">
    <h2>学校名称：{{ name | mySlice }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "广东白云学院",
      address: "广东广州",
    };
  },
};
</script>

<style scoped>
.demo {
  background-color: skyblue;
}
</style>
