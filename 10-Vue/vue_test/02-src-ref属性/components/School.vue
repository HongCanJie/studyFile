<template>
  <!-- 组件的template标签下有多少元素，页面就会显示多少元素 -->
  <div class="demo">
    <h2>学校名称：{{ name }}</h2>
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

<style>
.demo {
  background-color: skyblue;
}
</style>