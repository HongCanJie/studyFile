<template>
  <div class="container">
    <Category title="游戏">
      <!-- 由于传过来的是一个对象中的对象数组，所以可以通过解构把对象数组中的值提取出来(es6) -->
      <!-- 插槽使用者在使用数据前，需要使用scope属性获取数据 -->
      <!-- 作用：主要用于数据在组件自身，而插槽的使用者需要用到数据时 -->
      <template scope="{games}">
        <ul v-for="(item, index) in games" :key="index">
          <li>{{ item }}</li>
        </ul>
      </template>
    </Category>
    <Category title="游戏">
      <template scope="{games}">
        <ol v-for="(item, index) in games" :key="index">
          <li>{{ item }}</li>
        </ol>
      </template>
    </Category>
    <Category title="游戏">
      <template slot-scope="{ games }">
        <h4 v-for="(item, index) in games" :key="index">
          {{ item }}
        </h4>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category";
// 创建并暴露App组件
export default {
  name: "App",
  components: { Category },
};
</script>

<style lang="css">
.container,
.foot,
.food {
  display: flex;
  justify-content: space-around;
}
</style>