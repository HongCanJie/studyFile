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
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
// 注意需要解构
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户输入的数字
    };
  },
  computed: {
    // 方法二：借助mapState、mapGetters映射生成计算属性，从state中提取数据出来。（对象写法）
    // 注意:这里使用展开运算符是由于mapState和mapGetters返回的是一个对象,而对象中的方法需要解构放入一个对象中就需要用到展开运算符(即对象中插入对象使用展开运算符)
    // ...mapState({ sum: "sum", school: "school", subject: "subject" }),
    // ...mapGetters({ bigSum: "bigSum" }),

    // 方法三:借助mapState、mapGetters映射生成计算属性，从state中提取数据出来。（数组写法）(计算属性属性名和state中的属性名重名)
    ...mapState(["sum", "school", "subject"]),
    ...mapGetters(["bigSum"]),
  },
  methods: {
    // 如何使用vuex生成commit和dispatch对应的函数？

    // 方法一：程序员亲自写
    // increment() {
    //   this.$store.commit("JIA", this.n);
    // },
    // decrement() {
    //   this.$store.commit("JIAN", this.n);
    // },
    // incrementOdd() {
    //   this.$store.dispatch("jiaOdd", this.n);
    // },
    // incrementWait() {
    //   this.$store.dispatch("jiaWait", this.n);
    // },

    // 方法二：
    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
    // 注意：方法中的参数要在模板中传递过来
    ...mapMutations({ increment: "JIA", decrement: "JIAN" }),
    ...mapActions({ incrementOdd: "jiaOdd", incrementWait: "jiaWait" }),

    // 方法三：
    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法)
    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(数组写法)
    // ...mapMutations(["JIA", "JIAN"]),
    // ...mapActions(["jiaOdd", "jiaWait"]),
  },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>