<template >
  <!-- 卡片样式 -->
  <el-card class="box-card">
    <div class="clearfix">
      <h3 class="login-title">系统登录</h3>
    </div>
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="80px"
             class="demo-ruleForm">

      <el-form-item label="用户名"
                    prop="username">
        <el-input type="text"
                  v-model="ruleForm.username"
                  placeholder="请输入用户名"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密  码"
                    prop="password">
        <el-input type="password"
                  v-model="ruleForm.password"
                  placeholder="请输入密码"
                  autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   style="margin-left: 50px;"
                   @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')"
                   style="margin-left: 45px;">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script>
import Mock from 'mockjs'
// 引入cookie
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        // 校验规则   失去焦点的时候触发
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],

      }
    };
  },
  methods: {
    // 登录
    submitForm () {
      // Token信息
      //   const token = Mock.Random.guid() // 生成一个随机数

      //   Cookie.set('token', token)

      //   this.$router.push('/home')  // 跳转到首页     -->  判断当前的token是否存在，如果没有登陆的话token就不存在 在main.js

      // 判断校验通过
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          getMenu(this.ruleForm).then(({ data }) => {  // 这的data是从permission里面的
            console.log('data', data);
            if (data.code === 20000) { // 说明角色一登录成功
              const token = data.data.token
              Cookie.set('token', token)// 利用cookie来保存token的信息,用于不同页面间的通信

              //   获取菜单的数据，存入store中

              this.$store.commit('setMenu', data.data.menu)
              this.$store.commit('addMenu', this.$router)
              this.$router.push('/home')
            } else {


              this.$alert('用户名或密码错误！', '登录失败', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'warning',
                    message: `action: ${action}`
                  });
                }
              });

            }
          })
        }
      })


    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 200px auto;
  border-radius: 3%;
  /deep/.el-input__inner {
    margin-left: 10px;
    width: 85%;
  }
}
.login-title {
  color: #606266;
  height: 46px;
  line-height: 46px;
  text-align: center;
}
</style>

<!-- 1. 权限管理 -->
<!-- 2. 不同角色看到的内容也不一样 -->
<!--通过 Token 判断系统是否合法  进行权限判断-->