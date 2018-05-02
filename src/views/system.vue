<template>
  <div class="system">
      <header>
        <h2>后台管理系统</h2>
        <div class="showuser">
          <div @mousemove="menuShow=true" @mouseout="menuShow=false" class="userlogo">

          <icon name="user-circle-o" style="font-size: 50px;"></icon>
          </div>
          <ul class="menu" v-show="menuShow"  @mousemove="menuShow=true" @mouseout="menuShow=false">
            <li @click="dialogVisible = true">修改密码</li>
            <li @click="logout">登出</li>
          </ul>
        </div>
      </header>
      <main>
        <router-view></router-view>
      </main>
      <nav class="clearfix">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <router-link tag="li" slot="title" :to="{name: 'usersmanage'}"><icon name="user"></icon> <span>用户管理</span></router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link tag="li" slot="title" :to="{name: 'repairmanage'}"><icon name="wrench"></icon> <span>报修管理</span></router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link tag="li" slot="title" :to="{name: 'sharemanage'}"><icon name="support"></icon> <span>圈子管理</span></router-link>
          </el-menu-item>
        </el-menu>
      </nav>
      <el-dialog title="重置密码" :visible.sync="dialogVisible">
        <el-form :model="form" status-icon :rules="formRules" ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import common from "../assets/js/common.js";
export default {
  name: "system",
  data() {
    //校验密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      menuShow: false,
      dialogVisible: false,
      form: {
        pass: "",
        checkPass: ""
      },
      // editLoading: false,
      // btnEditText: "提 交",
      formRules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      var stuId = common.getCookie("stuId");
      var pwd = this.form.pass;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$http
            .post("/api/user/resetpwd", {
              stuId: stuId,
              pwd: pwd
            })
            .then(function(res) {
              console.log(res.data.status);

              if (res.data.status == "1") {
                that.$alert(res.data.msg, "重置密码提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    that.$router.push({ name: "login" });
                  }
                });
              } else {
                that.$alert(res.data.msg, "重置密码提示", {
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //登出账号
    logout() {
      var stuId = common.getCookie("stuId");
      var that = this;
      this.$http
        .post("/api/user/logout", {
          stuId: stuId
        })
        .then(function(res) {
          console.log(res.data.status);

          if (res.data.status == "1") {
            that.$alert(res.data.msg, "登出提示", {
              confirmButtonText: "确定",
              callback: action => {
                that.$router.push({ name: "login" });
              }
            });
          } else {
            that.$alert(res.data.msg, "登出提示", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
    console.log("roleId: ", common.getCookie("roleId"));
    if (common.getCookie("roleId") != 0) {
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style scoped>
.system {
  width: 100%;
  height: 100%;
  background-color: #292c2d;
}
.system header {
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  color: white;
  padding-left: 20px;
}
.system h2 {
  font-size: 50px;
}
.system nav {
  /* background-color: blue; */
  float: left;
  position: absolute;
  min-width: 150px;
  background-color: white;
  top: 80px;
  bottom: 0;
  height: calc(100% - 80px);
}
.system main {
  background-color: white;
  float: right;
  position: absolute;
  bottom: 0;
  top: 80px;
  left: 150px;
  right: 0;
  padding: 20px;
  overflow-y: auto;
}
.menu {
  position: absolute;
  top: 66px;
  left: -10px;
  background-color: #fcfcfc;
  color: #000;
  z-index: 2;
  text-align: center;
  width: 100px;
  border-radius: 4px;
}
.menu li {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  padding: 3px 20px;
}
.menu li + li {
  border-top: 1px solid #ccc;
}
.menu li:hover {
  background-color: #eeeeee;
  border-radius: 4px;
  cursor: pointer;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 100%;
}

svg {
  width: 16px;
  height: 16px;
}
.showuser {
  position: absolute;
  right: 20px;
  top: 0;
  width: 80px;
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.userlogo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.showuser svg {
  width: 50px;
  height: 50px;
}
</style>
