<template>
  <div>
    <Test1 />
    <Test2 />
    <Test3 />
  </div>
</template>

<script>
// 导入子组件
import Test1 from "./components/Test1";
import Test2 from "./components/Test2";
import Test3 from "./components/Test3";

// 创建并暴露App组件
export default {
  name: "App",
  components: { Test1, Test2, Test3 },
};
</script>

<style>
</style>