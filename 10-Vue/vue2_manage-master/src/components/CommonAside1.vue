<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse"
                    style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->

    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <p>{{ isCollapse ? "后台" : "通用后台管理系统" }}</p>
      <!-- v-for遍历     key固定且为一的值   :是v-bind:的简写表示动态变化  @是v-on:的简写    @click点击方法-->
      <el-menu-item
        v-for="item in noChildren"
        @click="clickMenu(item)"
        :key="item.name"
        :index="item.name"
      >
        <!-- 设置获取动态图标 动态绑定 v-bind:   -->
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
        <!--  外面的花括号是说：我这里面写的是js语句,内部的花括号是说：我里面的不是要显示的文字，而是变量，我要把变量的值解析放在这 -->
      </el-menu-item>

      <!-- 二级菜单显示部分 -->
      <el-submenu
        v-for="item in hasChildren"
        :key="item.label"
        :index="item.label"
      >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>

        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.name"
        >
          <!-- 遍历children属性，注意此时遍历用的subItem不再使用item -->
          <el-menu-item :index="subItem.name" @click="clickMenu(subItem)">{{
            subItem.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<!-- scoped表示只作用于当前页面  -->
 <style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh; // vh可视窗口的百分比单位
  border-right: 0;
  p {
    // less的嵌套语法
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: white;
    line-height: 48px;
  }
}
</style>

<script>
import Cookie from "js-cookie";

export default {
  data() {
    return {
      //   isCollapse: false, data里面的数据不能重复电仪
      //   menuData转成动态数据
      //   menuData: [
      //     {
      //       path: '/',
      //       name: 'home',
      //       label: '首页',
      //       icon: 's-home',
      //       url: 'Home/Home'
      //     },
      //     {
      //       path: '/mall',
      //       name: 'mall',
      //       label: '商品管理',
      //       icon: 'video-play',  // 在element-ul中的Icon图标可以搜索到
      //       url: 'MallManage/MallManage'
      //     },
      //     {
      //       path: '/user',
      //       name: 'user',
      //       label: '用户管理',
      //       icon: 'user',
      //       url: 'UserManage/UserManage'
      //     },
      //     {
      //       label: '其他',
      //       icon: 'location',
      //       // 根据children来判断是否有子菜单
      //       children: [
      //         {
      //           path: '/page1',
      //           name: 'page1',
      //           label: '页面1',
      //           icon: 'setting',
      //           url: 'Other/PageOne'
      //         },
      //         {
      //           path: '/page2',
      //           name: 'page2',
      //           label: '页面2',
      //           icon: 'setting',
      //           url: 'Other/PageTwo'
      //         }
      //       ]
      //     },
      //     {
      //       label: '其他2',
      //       icon: 'location',
      //       // 根据children来判断是否有子菜单
      //       children: [
      //         {
      //           path: '/page21',
      //           name: 'page21',
      //           label: '页面21',
      //           icon: 'setting',
      //           url: 'Other/PageOne2'
      //         },
      //         {
      //           path: '/page22',
      //           name: 'page22',
      //           label: '页面22',
      //           icon: 'setting',
      //           url: 'Other/PageTwo2'
      //         }
      //       ]
      //     },
      //   ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击菜单
    clickMenu(item) {
      console.log(item);
      console.log(this.$route.path); // 表示当前路由，比如从A跳到B页面，那么当前路由是A
      console.log(item.path);
      console.log("item", item); // 点击菜单获取当前路由的信息

      //   this.$route当前路由，this.$router全局路由可以调用push()
      //   实现跳转,如果是同一个页面进行跳转的话会报错，所以要设置当页面不一致时才允许跳转
      if (
        this.$route.path !== item.path &&
        (this.$route.path !== "/home" || item.path !== "/")
      ) {
        this.$router.push(item.path);
      }

      //   点击的时候调用mutation, 1.通过store的commit方法  2.通过辅助函数
      this.$store.commit("selectMenu", item);
    },
  },

  //   对数据进行处理分为有子菜单和没有子菜单的数据
  computed: {
    // 没有子菜单S
    noChildren() {
      // console.log(this.menuData.filter((item) => !item.children));
      return this.menuData.filter((item) => !item.children); // 不存在该属性
    },

    // 有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },

    isCollapse() {
      // 对应模块tab下面的isCollapse
      //   console.log(this.$store.state.tab.isCollapse, 'isCollapse');
      return this.$store.state.tab.isCollapse;
    },
    // 把静态数据转成动态
    menuData() {
      // 获取store的state
      // 判断当前数据，如果缓存中没有，当前store中获取

      return JSON.parse(Cookie.get("menu")) || this.$store.state.tab.menu;
    },
  },
};
</script>