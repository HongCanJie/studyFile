<template>
  <div class="category">
    <h3>{{ title }}</h3>
    <!-- 插槽:作用就是挖个坑，等着组件的使用者过来填充结构 -->
    <slot>插槽默认值，如果组件的使用者没有传递数据，那么我就会显示</slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
};
</script>

<style>
.category {
  background: skyblue;
  width: 200px;
  height: 300px;
}

.category h3 {
  text-align: center;
  background-color: orange;
  font-weight: 550;
}

img {
  width: 100%;
}

video {
  width: 100%;
}
</style>