<template>
  <div>
    <el-rate v-model="value1"></el-rate>
    <el-steps :space="200" :active="1" finish-status="success">
      <el-step title="已完成"></el-step>
      <el-step title="进行中"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-col :sm="12" :lg="6">
      <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
        <template slot="extra">
          <el-button type="primary" size="medium">返回</el-button>
        </template>
      </el-result>
    </el-col>
  </div>
</template>

<script>
// 创建并暴露App组件
export default {
  name: "App",
  data() {
    return {
      value1: null,
      value2: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  },
};
</script>
