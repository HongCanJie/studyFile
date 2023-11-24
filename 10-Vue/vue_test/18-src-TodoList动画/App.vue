<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 导入子组件
import pubsub from "pubsub-js";
import MyHeader from "./components/MyHeader";
import MyList from "./components/MyList";
import MyFooter from "./components/MyFooter";

// 创建并暴露App组件
export default {
  name: "App",
  components: { MyHeader, MyList, MyFooter },
  data() {
    return {
      // 当缓存中没有数据时，就赋一个空数组
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  // 数据子传父,父组件要先将定义好的函数传给子组件,子组件通过调用该函数把数据传给父组件
  methods: {
    // 添加一个todo
    addTodo(todoObj) {
      // 在首位插入一条数据
      this.todos.unshift(todoObj);
    },
    // 取消或勾选一个todo
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id == id) todo.done = !todo.done;
      });
    },
    // 删除一个todo
    deleteTodo(_, id) {
      // 将传过来的id过滤掉
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    // 全选or取消全选
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
    // 清除所有已经完成的todo
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
    // 更新Todo
    updataTodo(id, title) {
      this.todos.forEach((todo) => {
        if (todo.id == id) todo.title = title;
      });
    },
  },
  // 监视数据
  watch: {
    todos: {
      deep: true,
      // 传入新数据
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    // 绑定事件(传数据)
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("updataTodo", this.updataTodo);
    // this.$bus.$on("deleteTodo", this.deleteTodo);
    // 消息订阅
    this.pubId = pubsub.subscribe("deleteTodo", this.deleteTodo);
  },
  beforeDestroy() {
    // 解绑事件
    this.$bus.$off("checkTodo");
    this.$bus.$off("updataTodo");
    // this.$bus.$off("deleteTodo");
    // 取消订阅
    pubsub.unsubscribe(this.pubId);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(103, 157, 178);
  margin-right: 5px;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>