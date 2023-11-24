<template>
  <div>
    <img
      src="./images/代理服务器的工作原理.png"
      alt="代理服务器的工作原理"
      width="400px"
      height="300px"
    />
    <br />
    <br />
    <button @click="getStudent">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
// 导入axios库
import axios from "axios";
// 创建并暴露App组件
export default {
  name: "App",
  methods: {
    getStudent() {
      /*
      服务器的请求步骤:
      axios会向代理服务器地址http://localhost:8080/ken/students发送请求，
      之后代理服务器会根据正则去掉/ken前缀向服务器5050发送请求
      */
      axios.get("http://localhost:8080/ken/students").then(
        //注:如果在向代理服务器发送请求时没有携带/ken就会访问到students文件
        (response) => {
          console.log("请求成功", response.data);
        },
        (error) => {
          console.log("请求失败", error.message);
        }
      );
    },
    getCars() {
      /*
      服务器的请求步骤:
      axios会向代理服务器地址http://localhost:8080/ken/students发送请求，
      之后代理服务器会根据正则去掉/ken前缀向服务器5050发送请求
      */
      axios.get("http://localhost:8080/demo/cars").then(
        (response) => {
          console.log("请求成功", response.data);
        },
        (error) => {
          console.log("请求失败", error.message);
        }
      );
    },
  },
};
</script>
