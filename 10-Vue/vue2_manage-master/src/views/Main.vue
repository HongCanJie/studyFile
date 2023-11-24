<!-- 创建主路由 -->
<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <!-- 注意这里组件的写法 -->
        <common-aside1 />
      </el-aside>
      <el-container>
        <el-header>
          <!-- 注意这里组件的写法 -->
          <common-head />
        </el-header>
        <el-main>
          <common-tag />
          <!-- 内容区域 -->
          <!-- <h1>我是Main</h1> -->
          <!-- 子路由出口 -->
          <!-- 子路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>

import CommonAside1 from '../components/CommonAside1.vue'
import CommonHead from '../components/CommonHead.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  data () {
    return {}
  },
  //   引入组件
  components: {
    CommonAside1,
    CommonHead,
    CommonTag
  }
}
</script>

