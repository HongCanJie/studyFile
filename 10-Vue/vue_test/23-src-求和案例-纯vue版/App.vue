<template>
  <div>
    <Count />
  </div>
</template>

<script>
import Count from "./components/Count";
// 创建并暴露App组件
export default {
  name: "App",
  components: { Count },
};
</script>
