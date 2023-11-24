<template>
  <ul>
    <li>消息编号：{{ id }}</li>
    <li>消息列表：{{ title }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  props: ["id", "title"],
  // computed: {
  //   id() {
  //     return $route.query.id;
  //   },
  //   title() {
  //     return $route.query.title;
  //   },
  // },
  //   mounted() {
  //     console.log(this);
  //   },
};
</script>

<style>
</style>