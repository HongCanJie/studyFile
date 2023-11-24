<template>
  <div class="category">
    <h3>{{ title }}</h3>
    <!-- 作用域插槽传数据前，组件要先定义一个属性（如：:games="games"）将数据反向传给插槽使用者 -->
    <slot :games="games"
      >插槽默认值，如果组件的使用者没有传递数据，那么我就会显示</slot
    >
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
  data() {
    return {
      games: ["红色警戒", "穿越火线", "csgo2"],
    };
  },
};
</script>

<style>
.category {
  background: skyblue;
  width: 200px;
  height: 300px;
}

.category h3,
h4 {
  text-align: center;
}

.category h3 {
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