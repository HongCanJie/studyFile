
<template>
  <div class="header-container">
    <div class="l-content">
      <el-button type="primary"
                 @click="handleMenu"
                 size="mini"
                 icon="el-icon-menu"></el-button>
      <!-- 用vuex进行统一数据处理 -->
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in isTablist"
                            :key="item.path"
                            :to="{ path: item.path}">{{ item.label }}</el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <div class="r_content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
               alt=""
               srcset="">
          <!-- <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar> -->

        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="login-out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// 辅助函数
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  data () {
    return {

    }
  },
  methods: {
    // 定义获得数据的方法
    handleMenu () {
      this.$store.commit('collapseMenu')
    },

    handleCommand (command) {
      if (command === 'login-out') {
        console.log('退出登录');
        Cookie.remove('token') // 退出登录的话需要移除token 清除cookie中的token
        Cookie.remove('menu')  // 清除cookie中的menu
        this.$router.push('/Login')  // 跳转到登录页面
      }

    }




  },
  //   辅助函数方法
  computed: {
    ...mapState({ // 返回一个对象...
      tags: state => state.tab.tabList,
    }),
    isTablist () {
      console.log(this.$store.state.tab.tabsList, 'isTablist11');
      return this.$store.state.tab.tabsList
    },

  },

  mounted () {

  }
}
</script>

<style lang="less" >
.header-container {
  height: 60px;
  //   width: 100vh;
  background-color: #333;
  padding: 0 20px;
  display: flex;
  justify-content: space-between; // 定义项目在主轴上的对齐方式，两端对齐，项目之间的间隔都相等
  align-items: center; // flex布局定义项目在竖直方向上对齐方式
}
.el-header {
  padding: 0;
}

// 在style经常用scoped属性实现组件的私有化时，要改变element-ui某个深层元素（eg:.el-input__inner）或其他深层样式时， 需要使用/deep/
// .l-content {
// 	...
// 	/deep/.el-breadcrumb__item{
// 		....
// 	}
// }
.l-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .el-button--primary {
    background-color: #fff;
    color: #333;
    border-color: #fff;
  }
  .el-breadcrumb__item {
    margin-left: 15px;

    // &表示且
    &:last-child {
      .el-breadcrumb__inner {
        color: #fff;
      }
    }
    //   .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    //   .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    //   .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    //   .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    //     color: #fff;
    //   }
  }
  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    color: #666;
  }
}
.r_content {
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
