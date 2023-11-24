<template>
  <div class="container">
    <Search />
    <List />
  </div>
</template>

<script>
import Search from "./components/Search";
import List from "./components/List";
// 创建并暴露App组件
export default {
  name: "App",
  components: { Search, List },
};
</script>
