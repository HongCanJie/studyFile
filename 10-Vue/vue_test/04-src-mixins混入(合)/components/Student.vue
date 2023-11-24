<template>
  <div>
    <h2 @click="showName">学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
  </div>
</template>

<script>
// 解构赋值引入混合
import { hunhe1, hunhe2 } from "../mixin";
export default {
  name: "Student",
  data() {
    return {
      name: "ken",
      sex: "男",
    };
  },
  // 使用mixins混合公用的配置
  mixins: [hunhe1, hunhe2],
};
</script>
