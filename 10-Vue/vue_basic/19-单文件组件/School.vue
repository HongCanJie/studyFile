<template>
  <div class="demo">
    <h3>学校名称:{{ name }}</h3>
    <h3>地址:{{ address }}</h3>
  </div>
</template>

<script>
// 创建school组件(原本的写法)
const School = Vue.extend({
  data() {
    return {
      name: "广东白云学院",
      address: "广东广州",
    };
  },
});

export default School;
</script>

<style>
.demo {
  background-color: skyblue;
}
</style>