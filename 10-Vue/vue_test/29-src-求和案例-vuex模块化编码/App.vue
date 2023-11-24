<template>
  <div>
    <Count />
    <hr />
    <Person />
  </div>
</template>

<script>
import Count from "./components/Count";
import Person from "./components/Person";
// 创建并暴露App组件
export default {
  name: "App",
  components: { Count, Person },
};
</script>
