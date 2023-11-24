<template>
  <li>
    <label>
      <!-- @chang是元素发生变化且失去焦点的时候触发 -->
      <input
        type="checkbox"
        :checked="todo.done"
        @click="handleCheck(todo.id)"
      />
      <!-- 以下代码也能实现功能,但是不推荐使用,因为修改了props,违法了props只读的原则 -->
      <!-- 当props中的元素是一个数组或变量的时候修改props会产生报错,但是如果修改的是props中的对象中的某个属性,props就无法监测到,因为物理地址没变 -->
      <!-- <input type="checkbox" v-model="todo.done" /> -->
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <!-- 获取事件的数据$event -->
      <input
        type="text"
        :value="todo.title"
        v-show="todo.isEdit"
        @blur="handleBlur(todo, $event)"
        ref="inputTitle"
      />
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <button
      class="btn btn-edit"
      @click="handleEdit(todo)"
      v-show="!todo.isEdit"
    >
      编辑
    </button>
  </li>
</template>

<script>
// 引入消息订阅库
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  // 声明接收tudo对象
  props: ["todo"],
  methods: {
    // 勾选或取消勾选todo
    handleCheck(id) {
      // 通知App组件将对应id的todo的done值取反
      // this.checkTodo(id);
      this.$bus.$emit("checkTodo", id);
    },
    // 删除todo
    handleDelete(id) {
      // 通知App组件将对应id的todo删除
      // this.deleteTodo(id);
      // this.$bus.$emit("deleteTodo", id);
      pubsub.publish("deleteTodo", id); //发送消息
    },
    // 编辑
    handleEdit(todo) {
      // hasOwnProperty判断是否已经有isEdit
      if (todo.hasOwnProperty("isEdit")) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      // 在isEdit更新并渲染到页面之后执行
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
      // setTimeout(() => {
      //   this.$refs.inputTitle.focus();
      // });
    },
    // 失去焦点（执行数据传递）
    handleBlur(todo, e) {
      todo.isEdit = false;
      // 判断是否为空
      if (!e.target.value.trim()) return alert("输入不能为空！");
      this.$bus.$emit("updataTodo", todo.id, e.target.value);
    },
  },
  // updated() {
  //   this.$refs.inputTitle.focus();
  // },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>