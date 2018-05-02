<template>
  <div class="repairmanage">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'system' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报修管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="repairList" style="width: 100%;" :stripe="true">
      <el-table-column class="demo-table-expand" type="expand" fixed>
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="报修学号" v-if="props.row.applyStuId" width="100">
              <span>{{ props.row.applyStuId }}</span>
            </el-form-item>
            <el-form-item label="报修用户姓名" v-if="props.row.applyName" width="100">
              <span>{{ props.row.applyName }}</span>
            </el-form-item>
            <el-form-item label="性别" v-if="props.row.applysex" width="100">
              <span>{{ props.row.applysex }}</span>
            </el-form-item>
            <el-form-item label="联系方式" v-if="props.row.applyPhoneNum" width="100">
              <span>{{ props.row. applyPhoneNum}}</span>
            </el-form-item>
            <el-form-item label="报修主题" v-if="props.row.questionTitle" width="100">
              <span>{{ props.row. questionTitle}}</span>
            </el-form-item>
            <el-form-item label="报修描述" v-if="props.row.questionDes" class="questionDes">
              <span>{{ props.row. questionDes}}</span>
            </el-form-item>
            <el-form-item label="报修图片" v-if="props.row.questionImg" width="100">
              <img :src="props.row.questionImg" style="width: 200px;height:200px">
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" :index="indexMethod" fixed align="center"></el-table-column>
      <el-table-column prop="applyStuId" label="报修学号" align="center">
      </el-table-column>
      <el-table-column prop="applyName" label="报修用户姓名" align="center">
      </el-table-column>
      <el-table-column prop="applysex" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="applyPhoneNum" label="联系方式" align="center">
      </el-table-column>
      <el-table-column prop="status" label="报修单状态" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">分单</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "repairmanage",
  data() {
    return {
      repairList: [
        {
          _id: "5adb0d16a8d1423258b0d12b",
          applyId: "5adb0bb6a8d1423258b0d128",
          applyStuId: "201441404409",
          applyName: "詹源伟",
          applyPhoneNum: '13631782911',
          applysex: '男',
          applyPosition: null,
          applyTime: "2018-4-21 18:6:14",
          maintainId: null,
          maintainStuId: null,
          maintainName: null,
          maintainPosition: null,
          maintainTime: null,
          completeTime: null,
          serviceStar: null,
          status: "未接单",
          questionTitle: "重装系统",
          questionDes: "电脑系统坏了，需要重装",
          questionImg:
            "http://localhost:3000/public/images/record/201441404409/ApplyImg1524305171415.jpg"
        },
        {
          _id: "5adb0d16a8d1423258b0d12b",
          applyId: "5adb0bb6a8d1423258b0d128",
          applyStuId: "201441404409",
          applyName: "詹源伟",
          applyPosition: null,
          applyTime: "2018-4-21 18:6:14",
          maintainId: null,
          maintainStuId: null,
          maintainName: null,
          maintainPosition: null,
          maintainTime: null,
          completeTime: null,
          serviceStar: null,
          status: -1,
          questionTitle: "重装系统",
          questionDes: "电脑系统坏了，需要重装",
          questionImg:
            "http://localhost:3000/public/images/record/201441404409/ApplyImg1524305171415.jpg"
        }
      ]
    };
  },
  methods: {
    getRepairList() {
      var that = this;
      this.$http
        .get("/api/record/lists")
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
    }
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
.el-form--inline .el-form-item__label {
    width: 120px;
    text-align: right;
}

.questionDes {
  display: block;
}
</style>
