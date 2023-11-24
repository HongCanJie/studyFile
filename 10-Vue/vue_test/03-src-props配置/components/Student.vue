<template>
  <div>
    <h1 v-text="msg"></h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>学生年龄：{{ myAge }}</h2>
    <button @click="updateAge">点我学生年龄+1</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      msg: "欢迎学习Vue！",
      // 如果要将外部传入的数据再进行修改,就需要先定义一个变量把值存起来(可以理解为数据的中间商)
      myAge: this.age,
    };
  },
  methods: {
    updateAge() {
      this.myAge++;
    },
  },

  // 简单声明接收(常用)（记住设置props要用中括号而且要加引号）
  props: ["name", "age", "sex"],

  // 接收的同时对数据进行限制
  // props: {
  //   name: String,
  //   age: Number,
  //   sex: String,
  // },

  // 接收的同时对数据进行类型的限制+默认值的指定+必要性的限制(不符合类型规范会有报错,维护起来较好)
  // props: {
  //   name: {
  //     type: String, //name的数据类型是字符串
  //     required: true, //必定传值,否则报错
  //   },
  //   age: {
  //     type: Number,
  //     default: 25, //如果没有传值过来,就会默认指定这个值
  //   },
  //   sex: {
  //     type: String,
  //     required: true,
  //   },
  // },
};
</script>
