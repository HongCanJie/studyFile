<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "广东白云学院",
      address: "广东广州",
    };
  },
  mounted() {
    // 在school组件中绑定事件，$bus在vm上（注意：这里的方法要不写在methods里面要不就写在箭头函数里面，不能写在function里面，否则会出现this指向问题）
    this.$bus.$on("hello", (data) => {
      // console.log(this);
      console.log("school收到了数据：" + data);
    });
  },
  // 组件销毁前解绑事件，否则即使school组件自己销毁了，$bus上的hello事件仍然没有被销毁
  beforeDestroy() {
    this.$bus.$off("hello");
  },
};
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
  margin-top: 15px;
}
</style>
