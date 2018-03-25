<template>
  <div class="usersmanage">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'system' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
       <el-table :data="userList" style="width: 100%" :stripe="true" >
         <el-table-column label="序号" type="index" :index="indexMethod" fixed align="center"></el-table-column>
        <el-table-column
          fixed
          prop="stuId"
          label="学号"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="stuName"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="phoneNum"
          label="联系方式"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center">
        </el-table-column>
        <el-table-column
          prop="email"
          label="电子邮箱"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="wechat"
          label="微信"
          align="center">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
          align="center">
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
  name: "usersmanage",
  data() {
    return {
      userList: []
    };
  },
  methods: {
    getUserList() {
      var that = this;
      this.$http
        .get("/api/user/lists")
        .then(function(res) {
          console.log(res.data.status);

          if (res.data.status == "1") {
            that.userList = res.data.result;
          } else {
            that.$alert(res.data.msg, "获取列表", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  beforeMount() {
    this.getUserList();
  }
};
</script>

<style scoped>

</style>
