<template>
  <div class="todo-footer" v-show="total">
    <label>
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos", "checkAllTodo", "clearAllTodo"],
  computed: {
    // 统计总量
    total() {
      return this.todos.length;
    },
    // 统计勾选的数量
    doneTotal() {
      // reduce是array中常用来统计数量的一个方法 pre是上一个统计的值,current是当前数组值
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },

    // 全选勾选
    // isAll() {
    //   // 在计算属性中使用计算属性的值需要用this
    //   // if (this.total == this.doneTotal && this.total > 0) return true;
    //   return this.total == this.doneTotal && this.total > 0;
    // },
    isAll: {
      get() {
        return this.total == this.doneTotal && this.total > 0;
      },
      set(value) {
        this.checkAllTodo(value);
      },
    },
  },
  methods: {
    // checkAll(e) {
    //   // check复选框中的值在checked中,input输入框中的值在value中
    //   this.checkAllTodo(e.target.checked);
    // },
    clearAll() {
      this.clearAllTodo();
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>