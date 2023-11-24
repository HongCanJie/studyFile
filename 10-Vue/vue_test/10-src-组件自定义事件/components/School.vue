<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="sendSchoolName(name)">点击发送学校信息</button>
  </div>
</template>

<script>
export default {
  name: "School",
  props: ["getSchoolName"],
  data() {
    return {
      name: "广东白云学院",
      address: "广东广州",
    };
  },
  methods: {
    sendSchoolName(name) {
      this.getSchoolName(name);
    },
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
