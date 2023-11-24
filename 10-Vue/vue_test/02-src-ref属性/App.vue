<template>
  <!-- 组件的template标签下有多少元素，页面就会显示多少元素 -->
  <div>
    <h2 v-text="msg" ref="title"></h2>
    <button @click="showDom" ref="btn">点我显示上面dom元素</button>
    <School ref="sch" />
  </div>
</template>

<script>
// 导入子组件
import School from "./components/School.vue";

// 创建并暴露App组件
export default {
  name: "App",
  components: {
    School,
  },
  data() {
    return {
      msg: "你好啊！",
    };
  },
  methods: {
    showDom() {
      console.log(this.$refs.title); //真实dom
      console.log(this.$refs.btn); //真实dom
      console.log(this.$refs.sch); //school组件的实例对象（vc）
    },
  },
};
</script>