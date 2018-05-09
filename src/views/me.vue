<template>
    <div class="me">
        <header>
            <div class="returnBtn" @click="returnIndex">
                <icon name="chevron-left"></icon>
            </div>
            <div class="logout" @click="logout">登出</div>
        </header>
        <main>
            <div class="userimg" @click="dialogVisible=true">
                <div v-if="defaultImg">
                <icon name="user-circle-o"></icon>

                </div>
                <div class="userimgshow" v-else :style="{backgroundImage: 'url('+userimg+')'}"></div>
            </div>
            <h1>{{stuName}}</h1>
            <h2>{{roleName}}</h2>
            <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#DADADA" text-color="#41C0A3" active-text-color="#41C0A3" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">个人信息</el-menu-item>
                <el-menu-item index="2" v-if="showApply">报修详情</el-menu-item>
                <el-menu-item index="2" v-else>维修详情</el-menu-item>
            </el-menu>
            <el-form v-if="tabshow" class="changeForm" ref="changeForm" :rules="rules" size="medium" label-position="right" :model="changeForm" label-width="80px">
                <!-- 不可以修改的：学号，性别，姓名，用户类型，身份证照片，学生证照片； -->
                <!-- 可以修改的：联系方式，电子邮箱，QQ号码，微信，年龄，密码； -->
                <el-form-item label="学号" prop="stuId">
                    <span>{{changeForm.stuId}}</span>
                </el-form-item>
                <el-form-item label="性别" prop="sex" class="user-sex">
                    <span>{{changeForm.sex}}</span>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <span v-if="resetShow">{{changeForm.age}}</span>
                    <el-input v-else v-model="changeForm.age"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phoneNum">
                    <span v-if="resetShow">{{changeForm.phoneNum}}</span>
                    <el-input v-else v-model="changeForm.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <span v-if="resetShow">{{changeForm.email}}</span>
                    <el-input v-else v-model="changeForm.email"></el-input>
                </el-form-item>
                <el-form-item label="QQ号码" prop="qq">
                    <span v-if="resetShow">{{changeForm.qq}}</span>
                    <el-input v-else v-model="changeForm.qq"></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="wechat">
                    <span v-if="resetShow">{{changeForm.wechat}}</span>
                    <el-input v-else v-model="changeForm.wechat"></el-input>
                </el-form-item>
                <el-form-item v-if="!resetShow" label="密码" prop="password">
                    <el-input  v-model="changeForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item v-if="!resetShow" label="确认密码" prop="checkpass">
                    <el-input v-model="changeForm.checkpass" type="password"></el-input>
                </el-form-item>
                <el-form-item v-if="resetShow" label-width="0px" class="buttonshow">
                    <el-button type="primary" @click="resetShow=false">修改个人信息</el-button>
                </el-form-item>
                <el-form-item v-else label-width="0px" class="buttonshow">
                    <el-button type="primary" @click="submitForm('changeForm')">保存</el-button>
                    <el-button @click="resetForm('changeForm')">重置</el-button>
                    <el-button @click="resetShow = true">取消</el-button>
                </el-form-item>

            </el-form>
            <div v-else>
                <el-table :data="applyHistory" style="width: 100%" v-if="applyHistoryShow">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                          <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                          <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                          <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                          <span>{{ props.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                          <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                          <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                          <span>{{ props.row.desc }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="序号" type="index" :index="getIndex" align="center"
                    prop="id">
                  </el-table-column>
                  <el-table-column
                    label="商品名称"
                    prop="name">
                  </el-table-column>
                  <el-table-column
                    label="描述"
                    prop="desc">
                  </el-table-column>
                </el-table>
            </div>
        </main>
        <el-dialog
          title="上传头像"
          :visible.sync="dialogVisible"
          class="uploadImg">
          <el-upload name="UserImg" :data="pictureData" :on-success="uploadSuccess" action="/api/user/uploadUserImg" :limit="1"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" style="margin-left: 10px;">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-dialog>
    </div>
</template>

<script>
import common from "../assets/js/common.js";
export default {
  name: "me",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        // callback(new Error("请输入密码"));
      } else {
        if (this.changeForm.checkpass !== "") {
          this.$refs.changeForm.validateField("checkpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        // callback(new Error("请再次输入密码"));
      } else if (value !== this.changeForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      stuName: "",
      roleName: "",
      changeForm: {
        stuId: "201441404409",
        sex: "男",
        age: 18,
        phoneNum: "13631782911",
        email: "844945330@qq.com",
        qq: "844945330",
        wechat: "844945330",
        password: "",
        checkpass: ""
      },
      activeIndex: "1",
      resetShow: true,
      rules: {
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        phoneNum: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      tabshow: true,
      dialogVisible: false,
      pictureData: {
        stuId: common.getCookie("stuId")
      },
      userimg: "",
      defaultImg: true,
      showApply: common.getCookie("roleId") == 2 ? true : false,
      applyHistory: [],
      repairHistory: [],
      applyHistoryShow: true
    };
  },
  methods: {
    getInformation() {
      var that = this;
      var stuName = common.getCookie("stuName");
      var roleName = common.getCookie("roleName");
      var stuId = common.getCookie("stuId");
      if (stuName && roleName) {
        this.stuName = stuName;
        this.roleName = roleName;
        console.log("stuName:", stuName);
      } else {
        console.log("不存在用户信息请重新登录");
      }
      this.$http
        .get("/api/user/myinfo", {
          params: { stuId: stuId }
        })
        .then(function(res) {
          console.log("res: ", res);
          if (res.data.status == 0) {
            that.$alert(res.data.msg, "获取个人信息提示", {
              confirmButtonText: "确定"
            });
          } else if (res.data.status == 1) {
            that.changeForm = res.data.result;
            that.userimg = res.data.result.userImg;
            if (that.userimg != null) {
              that.defaultImg = false;
            }
          }
        })
        .catch(function(err) {
          console.log("err: ", err);
        });
    },
    returnIndex() {
      this.$router.push({
        name: "index"
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.tabshow = !this.tabshow;
      if (common.getCookie("roleId") == 2) {
        this.applyHistoryShow = true;
      } else {
        this.applyHistoryShow = false;
      }
    },
    submitForm(formName) {
      var that = this;
      var flag = 0;
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.changeForm.password);
          console.log(this.changeForm.checkpass);
          if (this.changeForm.password !== this.changeForm.checkpass) {
            this.$alert("请校验密码", "提示", {
              confirmButtonText: "确定"
            });
            return false;
          }
          console.log("password: ", this.changeForm.password);
          if (this.changeForm.password == "") {
            //更新密码
            that.$http
              .post("/api/user/resetpwd", {
                stuId: common.getCookie("stuId"),
                pwd: this.changeForm.password
              })
              .then(function(res) {
                console.log(res.data.status);
                if (res.data.status == 1) {
                  flag = 1;
                }
              })
              .catch(function(err) {
                console.log(err);
                that.$alert(err, "提示", {
                  confirmButtonText: "确定"
                });
              });
            //修改个人信息
            this.$http
              .post("/api/user/updateinfo", {
                stuId: common.getCookie("stuId"),
                age: this.changeForm.age,
                phoneNum: this.changeForm.phoneNum,
                email: this.changeForm.email
              })
              .then(function(res) {
                console.log(res.data.status);
                if (res.data.status == 1 && flag == 1) {
                  that.$alert(res.data.msg, "提示", {
                    confirmButtonText: "确定",
                    callback: action => {
                      that.resetShow = false;
                    }
                  });
                }
              })
              .catch(function(err) {
                console.log(err);
                that.$alert(err, "提示", {
                  confirmButtonText: "确定"
                });
              });
          } else {
            this.$http
              .post("/api/user/updateinfo", {
                stuId: common.getCookie("stuId"),
                age: this.changeForm.age,
                phoneNum: this.changeForm.phoneNum,
                email: this.changeForm.email
              })
              .then(function(res) {
                if (res.data.status == 1) {
                  that.$alert(res.data.msg, "提示", {
                    confirmButtonText: "确定"
                  });
                }
              })
              .catch(function(err) {
                that.$alert(err, "提示", {
                  confirmButtonText: "确定"
                });
              });
          }
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
          that.$alert(err, "提示", {
            confirmButtonText: "确定"
          });
        });
    },
    uploadSuccess(response, file, fileList) {
      if (response.status == 1) {
        this.dialogVisible = false;
        this.userimg = response.result.imgUrl;
        this.defaultImg = false;
      }
    },
    //获取报修维修详情
    getList() {
      var that = this;
      var roleId = common.getCookie("roleId");
      var stuId = common.getCookie("stuId");
      if (roleId == 2) {
        //如果是报修用户，发送applyStuId过去，除了status=-2其他返回
        this.$http
          .get("/api/record/getApplyHistory", {
            params: { stuId: stuId }
          })
          .then(function(res) {
            if (res.data.status == 1) {
              that.applyHistory = res.data.result;
            } else {
              that.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定"
              });
            }
          })
          .catch(function(err) {
            console.log("err: ", err);
          });
      } else if (roleId == 1) {
        //如果是维修用户，发送repaStuId过去，status=0||1返回
      }
    },
    getIndex(index) {
      return index + 1;
    }
  },
  beforeMount() {
    this.getInformation();
    this.getList();
  }
};
</script>

<style scoped>
.me {
  width: 100%;
  height: 100%;
  /* background-color: rgba(247, 247, 249, 0.2); */
}

.me header {
  width: 100%;
  height: 50px;
  /* background-color: aqua; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
}
.me header .returnBtn {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #41c0a3;
  /* margin-left: 12px; */
}

.me header .logout {
  font-size: 16px;
  color: #41c0a3;
}
.me header .logout:active {
  position: relative;
  top: 1px;
  left: 1px;
}
.me .fa-icon {
  font-size: 17px;
}
.me h1,
h2 {
  text-align: center;
}
.me h1 {
  font-size: 20px;
  line-height: 30px;
  height: 30px;
  color: #5a554f;
}
.me h2 {
  font-size: 16px;
  color: #a6a39e;
}

.me .userimg .fa-icon {
  width: 100px;
  height: 100px;
  color: #3bc0a3;
  /* background-color: black; */
  font-size: 80px;
  /* left: calc(50% - 50px); */
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -10px;
}

.el-menu-demo {
  width: 100%;
  font-size: 20px;
}

.el-menu-demo li {
  width: 50%;
  text-align: center;
}

.changeForm {
  width: 250px;
  margin: 20px auto;
  box-sizing: border-box;
  /* background: pink; */
}

.buttonshow {
  text-align: right;
}

.userimgshow {
  width: 100px;
  height: 100px;
  color: #3bc0a3;
  /* background-color: black; */
  font-size: 80px;
  /* left: calc(50% - 50px); */
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -10px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
</style>
