<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>当前求和为：{{ number }}</h2>
    <button @click="add">点我number+1</button>
    <button @click="sendStudentName(name)">点击发送学生信息</button>
    <button @click="unbind">解绑atguigu事件</button>
    <button @click="death">销毁当前Student组件的实例（vc）</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "ken",
      sex: "男",
      number: 0,
    };
  },
  methods: {
    add() {
      console.log("add回调被调用");
      this.number++;
    },
    sendStudentName(name) {
      // 触发Student组件实例对象上的atguigu事件
      // $emit("触发的事件名",传递的参数);
      this.$emit("atguigu", this.name, 2333, 666);
      this.$emit("demo");
      this.$emit("click");
    },
    // 解绑atguigu
    unbind() {
      // this.$off("atguigu");// 解绑单个事件时
      // this.$off(["atguigu", "demo"]);// 解绑多个事件
      this.$off(); //解绑所有的自定义事件
    },
    death() {
      this.$destroy(); // 销毁当前的student组件实例对象，销毁后所有student实例的自定义事件全部都不奏效
    },
  },
};
</script>

<style scoped>
.student {
  background-color: orange;
  padding: 5px;
  margin-top: 15px;
}
</style>
