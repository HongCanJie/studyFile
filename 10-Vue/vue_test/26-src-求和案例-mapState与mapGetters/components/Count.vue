<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h1>当前求和乘十倍为：{{ bigSum }}</h1>
    <h1>学校:{{ school }},学科：{{ subject }}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
// 注意需要解构
import { mapState, mapGetters } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户输入的数字
    };
  },
  computed: {
    // vuex管理的state如何在页面直接写属性名？

    // 方法一：程序员自己手动写计算属性
    // sum() {
    //   return this.$store.state.sum;
    // },
    // bigSum() {
    //   return this.$store.getters.bigSum;
    // },
    // school() {
    //   return this.$store.state.school;
    // },
    // subject() {
    //   return this.$store.state.subject;
    // },

    // 方法二：借助mapState、mapGetters映射生成计算属性，从state中提取数据出来。（对象写法）
    // 注意:这里使用展开运算符是由于mapState和mapGetters返回的是一个对象,而对象中的方法需要解构放入一个对象中就需要用到展开运算符(即对象中插入对象使用展开运算符)
    // ...mapState({ sum: "sum", school: "school", subject: "subject" }),
    // ...mapGetters({ bigSum: "bigSum" }),

    // 方法三:借助mapState、mapGetters映射生成计算属性，从state中提取数据出来。（数组写法）(计算属性属性名和state中的属性名重名)
    ...mapState(["sum", "school", "subject"]),
    ...mapGetters(["bigSum"]),
  },
  methods: {
    increment() {
      this.$store.commit("JIA", this.n);
    },
    decrement() {
      this.$store.commit("JIAN", this.n);
    },
    incrementOdd() {
      this.$store.dispatch("jiaOdd", this.n);
    },
    incrementWait() {
      this.$store.dispatch("jiaWait", this.n);
    },
  },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>