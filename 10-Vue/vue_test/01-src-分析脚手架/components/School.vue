<template>
  <div class="demo">
    <h3>学校名称:{{ name }}</h3>
    <h3>地址:{{ address }}</h3>
  </div>
</template>

<script>
// 创建school组件(原本的写法)
export default {
  // 注意一定要用大驼峰命名法
  name: "MySchool",
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