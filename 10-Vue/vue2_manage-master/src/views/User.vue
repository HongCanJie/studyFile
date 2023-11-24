<template>
  <div class="manage">
    <div class="manage-add-search">
      <el-button type="primary"
                 @click="handleAdd"
                 style="margin-top: 10px;">+ 新增</el-button>
      <!-- 用户的表单信息 -->
      <el-dialog title="新增用户"
                 width="30%"
                 :before-close="handleClose"
                 :visible.sync="dialogFormVisible">
        <!-- 这里的form对应data里面的form,对应表单域字段         el-input输入框-->
        <!-- :inline="true" 一行显示两个value-format设置日期显示格式 -->
        <!-- 通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
		Vue 为简化DOM获取方法提出了ref 属性和$refs 对象。一般的操作流程是:ref 绑定控件，$refs 获取控件 -->
        <el-form ref="form"
                 :inline="true"
                 :rules="rules"
                 :model="form">
          <el-form-item label="姓名"
                        prop="name"
                        :label-width="formLabelWidth">
            <el-input v-model="form.name"
                      placeholder="请输入姓名"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄"
                        prop="age"
                        :label-width="formLabelWidth">
            <el-input v-model="form.age"
                      placeholder="请输入年龄"
                      autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="性别"
                        prop="sex"
                        :label-width="formLabelWidth">
            <el-select v-model="form.sex"
                       placeholder="请选择">
              <el-option label="男"
                         :value="1"></el-option>
              <el-option label="女"
                         :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期"
                        prop="birth"
                        :label-width="formLabelWidth">
            <el-date-picker v-model="form.birth"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址"
                        prop="addr"
                        :label-width="formLabelWidth">
            <el-input v-model="form.addr"
                      placeholder="请输入地址"
                      autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary"
                     @click="submit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 搜索框 -->
      <el-form ref="userForm"
               :inline="true"
               :rules="rules"
               :model="userForm"
               style="display:flex">
        <el-form-item>
          <el-input v-model="userForm.name"
                    placeholder="输入搜索内容"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSearch">搜索</el-button>
        </el-form-item>

      </el-form>
    </div>
    <!-- 表格区域 -->
    <!-- el-table有height属性  cal(100% - 62px)动态计算高度 -->
    <el-table :data="tableData"
              stripe="true"
              height='52%'
              style="width: 100%;">
      <el-table-column prop="name"
                       label="姓名"
                       width="auto">
      </el-table-column>
      <el-table-column prop="age"
                       label="年龄"
                       width="auto">
      </el-table-column>
      <el-table-column prop="sex"
                       label="性别"
                       width="auto">
        <template slot-scope="scope">
          <!-- slot-scope="scope"：作用域插槽；scope.row表示那行数据对象 -->
          <span>{{ scope.row.sex == 1? ' 男':'女' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="birth"
                       label="出生日期"
                       width="auto">
      </el-table-column>
      <el-table-column prop="addr"
                       label="地址"
                       width="auto">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete( scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 属性用:绑定，事件用@绑定 -->
    <el-pagination @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="total">
    </el-pagination>
  </div>

</template>


<script>
// 引入api接口addUser delUser
import { getUser, addUser, editUser, delUser } from '../api'

export default {
  data () {
    return {
      // 新增和编辑共用一个对话框，当点击确定的时候需要判断是新增用户还是编辑用户
      modelType: 0, // 0表示新增的弹窗，1表示编辑
      formLabelWidth: '80px',
      dialogFormVisible: false,
      //   定义表单中含有的字段
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名' }
        ],
        age:
          [
            { required: true, message: '请输入年龄' }
          ],
        sex: [
          { required: true, message: '请选择性别' }
        ],
        birth: [
          { required: true, message: '请选择日期' }
        ],
        addr: [
          { required: false, message: '请输入地址' }
        ],
      },
      //  表格： 使用Mock模拟后端API接口，新建user.js存放模拟数据，在mock.js中添加了后端的操作之后，还需要在index.js中定义前端相关的API
      tableData: [],
      total: 0, // 总条数默认为0， 长度为表单长度
      //   用于分页 page是当前的页面，limit是当前页显示的条数
      pageData: {
        page: 1,
        limit: 10
      },
      userForm: {
        // 通过name属性判断
        name: '',
      },





    };
  },
  methods: {
    // 提交用户表单
    submit () {
      // this.$refs["form"]等同于this.$refs.form
      this.$refs.form.validate((valid) => {
        console.log(valid, 'valid');
        // 当表单校验通过时，后续对表单的处理
        if (valid) {
          console.log(this.form, 'from');
          //   点击确定时需要判断执行的操作是新增还是编辑
          if (this.modelType === 0) { // 新增 调用新增API接口
            // 把表单的数据加入  先调用新增的接口插入数据在调用获取列表的接口更新数据，获取列表的接口应该设成公共的接口
            addUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })

          }
          else { // 编辑  调用编辑API接口
            editUser(this.form).then(() => {
              this.getList()  // 重新获取列表的接口
            })
          }
          this.$refs["form"].resetFields()  //   重置信息
          this.dialogFormVisible = false  //   填写成功后关闭弹窗

        }
      })
    },
    // 关闭弹窗前的确认操作
    handleClose () {
      console.log(this.form);
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs["form"].resetFields()
          this.dialogFormVisible = false
          done();

        })
        .catch(_ => { });
    },
    // 点击取消的操作
    cancle () {
      this.$refs.form.resetFields()
      this.dialogFormVisible = false

    },
    // 表格的删除编辑操作等
    handleEdit (row) {
      this.modelType = 1
      this.dialogFormVisible = true
      //   注意此处不能直接把row给form表单，要通过深拷贝赋值，把这个对象数据拷贝到一个全新的对象，修改数据的时候不会改变原来对象的数据
      //   this.form = row
      this.form = JSON.parse(JSON.stringify(row))

    },
    // 删除操作  点击删除出现一个提示框messagebox
    handleDelete (row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口  传进去的是一个对象  
        delUser({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //   删除成功后重新获取列表的接口
          this.getList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 获取列表的数据
    getList () {
      // 获取列表数据 
      //   getUser({ params: this.pageData }).then(({ data }) => {

      // 因为有查询的操作，所以返回的不仅是列表内容，还得有查询的内容，所以是他们对象的合集了
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
        console.log(data, 'data');
        this.tableData = data.list
        // 如果存在则为实际长度，如果不存在则为0
        this.total = data.count || 0
        console.log(this.total, 'total');
      })
    },
    handleAdd () { // 新增按钮
      this.modelType = 0
      this.dialogFormVisible = true
      //   this.$refs["form"].resetFields()  //   重置信息
    },
    // 选择页码的回调函数
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.pageData.page = val
      this.getList()
    },
    // 列表的查询
    onSearch () {
      this.getList()
    },
  },
  //   生命周期
  mounted () {
    this.getList()
  }
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-add-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /deep/ .el-form-item__content {
      width: 220px;
      .el-select {
        width: 220px;
      }
    }
  }
  .el-pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>