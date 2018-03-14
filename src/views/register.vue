<template>
  <div class="register">
    <h1>用户注册</h1>
    <el-form ref="registerform" label-width="100px" size="medium" :inline="inline" label-position="right" :model="registerform">
      <el-form-item label="学号" required>
        <el-input v-model="registerform.stunumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名" required>
        <el-input v-model="registerform.stuname"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" required>
        <el-input v-model="registerform.phonenum"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" required>
        <el-input v-model="registerform.email"></el-input>
      </el-form-item>
      <el-form-item label="QQ号码">
        <el-input v-model="registerform.qq"></el-input>
      </el-form-item>
      <el-form-item label="微信">
        <el-input v-model="registerform.wechat"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="registerform.age" type="number"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="registerform.sex">
          <el-radio label="boy">男</el-radio>
          <el-radio label="girl">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户类型" required class="user-type">
        <el-radio-group v-model="registerform.usertype">
          <el-radio label="applicant">报修用户</el-radio>
          <el-radio label="maintainer">维修用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证照片" required class="upload-img" v-if="imgShow">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="学生证照片" required class="upload-img" v-if="imgShow">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="registerform.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" required>
        <el-input v-model="registerform.checkpass" type="password"></el-input>
      </el-form-item>
      <el-form-item class="button-area">
        <el-button type="primary" @click="submitForm('registerform')">立即创建</el-button>
        <el-button @click="resetForm('registerform')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name: "register",
    data() {
        return {
            registerform: {
                stunumber: "",
                stuname: "",
                sex: "boy",
                phonenum: "",
                email: "",
                age: "",
                qq: "",
                wechat: "",
                usertype: "applicant",
                password: "",
                checkpass: ""
            },
            fileList2: [],
            imgShow: false,
            inline: true
        };
    },
    computed: {
        watchUserType() {
            return this.registerform.usertype;
        }
    },
    watch: {
        watchUserType: function(newValue, oldValue) {
            console.log("usertype: ", newValue);
            if (newValue === "maintainer") {
                this.imgShow = true;
            } else {
                this.imgShow = false;
            }
        }
    },
    methods: {
        submitForm: function(formName) {
            console.log(formName);
            this.$router.push({
                name: "login",
                params: { stunumber: formName.stunumber }
            });
        },
        resetForm: function(formName) {
            console.log(formName);
            this.$refs[formName].resetFields();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    },
    mounted() {
        console.log(this.$route.params.stunumber);
    }
};
</script>

<style scoped>
@media screen and (min-width: 670px) {
    .register {
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
    }
    h1 {
        font-size: 1rem;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        margin-bottom: 10px;
    }
    form {
        font-size: 0.36rem;
        padding-left: 4%;
    }
    .el-form-item {
        width: 48%;
        /* text-align: right; */
    }
    .user-type,
    .upload-img {
        width: 100%;
    }
    .button-area {
        width: 85%;
        text-align: right;
    }
    .el-upload__tip {
        margin-left: 10px;
    }
}
@media screen and (min-width: 320px) and (max-width: 669px) {
    .register {
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
    }
    h1 {
        font-size: 1rem;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        margin-bottom: 10px;
    }
    form {
        font-size: 0.36rem;
        /* padding-left: 4%; */
    }
    .user-type,
    .upload-img {
        width: 100%;
    }
    .button-area {
        width: 100%;
        text-align: right;
    }
    .el-upload__tip {
        margin-left: 10px;
    }
}
</style>
