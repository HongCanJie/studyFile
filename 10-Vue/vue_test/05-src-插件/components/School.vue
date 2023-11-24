<template>
  <div>
    <h2>学校名称：{{ name | mySlice }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <!-- 在vm的原型上定义的方法 -->
    <button @click="this.hello">点我弹窗</button>
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
