<template>
  <div class="usersmanage">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'system' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="userList" style="width: 100%;" :stripe="true">
      <el-table-column class="demo-table-expand" type="expand" fixed>
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="电子邮箱" v-if="props.row.email" width="100">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="年龄" v-if="props.row.age" width="100">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="QQ" v-if="props.row.qq" width="100">
              <span>{{ props.row.qq }}</span>
            </el-form-item>
            <el-form-item label="微信" v-if="props.row.wechat" width="100">
              <span>{{ props.row.wechat }}</span>
            </el-form-item>
            <el-form-item label="身份证图片" v-if="props.row.IDCardImg" width="100">
              <img :src="props.row.IDCardImg" style="width: 200px;height:200px">
            </el-form-item>
            <el-form-item label="学生证图片" v-if="props.row.StuCardImg" width="100">
              <img :src="props.row.StuCardImg" style="width: 200px;height:200px">
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" :index="indexMethod" fixed align="center"></el-table-column>
      <el-table-column fixed prop="stuId" label="学号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="stuName" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="phoneNum" label="联系方式" width="120" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatterSex" align="center">
      </el-table-column>
      <el-table-column prop="roleName" label="用户角色" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-show="showExam(scope.$index, scope.row)" type="primary">审核</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        },
        formatterSex(row, column) {
            if(row.sex == 'boy'){
              return "男"
            }else {
              return "女"
            }
        },
        showExam(index,row){
          if(row.exist == 0){
            return true;
          }else {
            return false;
          }
        }
    },
    beforeMount() {
        this.getUserList();
    }
};
</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
