<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.enter="add"
      v-model="title"
    />
  </div>
</template>

<script>
// 这是一个生成id的一个库,安装后直接引用即可
import { nanoid } from "nanoid";
export default {
  name: "MyHeader",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    add() {
      // 校验数据:判断输入框的数据是否为空(去除前后空格)
      if (!this.title.trim()) return alert("输入框中的值不能为空,请重新输入!");
      // 将用户输入的包装成一个tudo对象
      const todoObj = { id: nanoid(), title: this.title, done: false };
      // 通知App组件去添加一个todo
      // this.addTodo(todoObj);
      this.$emit("addTodo", todoObj);
      // 清空输入框
      this.title = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>