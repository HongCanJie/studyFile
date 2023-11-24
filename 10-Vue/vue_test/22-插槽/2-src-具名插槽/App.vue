<template>
  <div class="container">
    <Category title="美食">
      <!-- 使用具名插槽通过slot属性指定元素放入对应的插槽中 -->
      <img slot="center" src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" />
      <a slot="footer" href="https://www.baidu.com" class="food">更多美食</a>
    </Category>
    <Category title="游戏">
      <ul v-for="(item, index) in games" :key="index" slot="center">
        <li>{{ item }}</li>
      </ul>
      <div slot="footer" class="foot">
        <a href="https://www.baidu.com">网络游戏</a>
        <a href="https://www.baidu.com">单机游戏</a>
      </div>
    </Category>
    <Category title="电影">
      <video
        slot="center"
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        controls
      ></video>
      <!-- v-slot:footer 这种写法仅仅适用在template中 -->
      <template v-slot:footer>
        <div class="foot">
          <a href="https://www.baidu.com">经典</a>
          <a href="https://www.baidu.com">热门</a>
          <a href="https://www.baidu.com">推荐</a>
        </div>
        <h4>欢迎前来观影</h4>
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
.container,
.foot,
.food {
  display: flex;
  justify-content: space-around;
}
</style>