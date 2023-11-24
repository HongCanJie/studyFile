<template>
  <div class="container">
    <Category title="美食">
      <img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" />
    </Category>
    <Category title="游戏">
      <ul v-for="(item, index) in games" :key="index">
        <li>{{ item }}</li>
      </ul>
    </Category>
    <Category title="电影">
      <video
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        controls
      ></video>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category";
// 创建并暴露App组件
export default {
  name: "App",
  components: { Category },
  data() {
    return {
      foods: ["火锅", "烧烤", "小龙虾"],
      games: ["红色警戒", "穿越火线", "csgo2"],
      films: ["《教父》", "《拆弹专家》", "《你好，李焕英》"],
    };
  },
};
</script>

<style lang="css">
.container {
  display: flex;
  justify-content: space-around;
}
</style>