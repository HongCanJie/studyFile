<template>
  <div>
    <h2 @click="showName">学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
// 解构赋值引入混合
import { hunhe1, hunhe2 } from "../mixin";
export default {
  name: "School",
  data() {
    return {
      name: "广东白云学院",
      address: "广东广州",
      // 当混合的数值与原先组件的data中配置的数据发生冲突时,优先data中的数据(如下面的数据控制台显示仍然是300)
      x: 300,
    };
  },
  // 使用mixins混合公用的配置
  mixins: [hunhe1, hunhe2],

  // 当原先组件配置的方法与混合中的方法发生冲突时,默认优先选择混合中的方法先执行然后再执行原先组件配置中的方法
  // mounted() {
  //   console.log("你好啊!!!");
  // },
};
</script>
