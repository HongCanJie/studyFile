<template>
  <ul>
    <li>消息编号：{{ $route.params.id }}</li>
    <li>消息列表：{{ $route.params.title }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  //   mounted() {
  //     console.log(this);
  //   },
};
</script>

<style>
</style>