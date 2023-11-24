<template>
  <div class="app">
    <h2>{{ msg }}</h2>

    <!-- 通过父组件给子组件传递函数类型的props实现，子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据 （第一种写法：v-on或@） -->
    <!-- <Student @atguigu.once="getStudentName" @demo="m1" /> -->

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据 （第二种写法：ref）这种写法比较灵活 -->
    <!-- click是dom原本就有的指令，所以定义自定义事件命这个名字的时候需要加.native -->
    <Student ref="student" @click.native="show" />
  </div>
</template>

<script>
// 导入子组件
import School from "./components/School.vue";
import Student from "./components/Student.vue";

// 创建并暴露App组件
export default {
  name: "App",
  components: {
    Student,
    School,
  },
  data() {
    return {
      msg: "你好啊！",
    };
  },
  methods: {
    // 获取学校名称
    getSchoolName(name) {
      console.log("学校名称是：" + name);
    },
    // 获取学生姓名
    getStudentName(name, ...params) {
      console.log("学生的姓名是：" + name, params);
    },
    m1() {
      console.log("m1被调用");
    },
    show() {
      alert(123);
    },
  },
  mounted() {
    // $on意思是当什么什么时候绑定一个事件
    this.$refs.student.$on("atguigu", this.getStudentName); //绑定自定义事件
    // this.$refs.student.$once("atguigu", this.getStudentName);//绑定自定义事件只能调用一次
  },
};
</script>

<style >
.app {
  background-color: #dedede;
  padding: 5px;
}
</style>