<template>
  <div class="register">
    <h1>用户注册</h1>
    <el-form ref="registerform" label-width="80px" :model="registerform">
      <el-form-item label="学号" required>
        <el-input v-model="registerform.stunumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名" required>
        <el-input v-model="registerform.stuname"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="registerform.sex">
          <el-radio label="boy">男</el-radio>
          <el-radio label="girl">女</el-radio>
        </el-radio-group>
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
      <el-form-item label="用户类型" required>
        <el-radio-group v-model="registerform.usertype">
          <el-radio label="applicant">报修用户</el-radio>
          <el-radio label="maintainer">维修用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="registerform.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" required>
        <el-input v-model="registerform.checkpass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerform')">立即创建</el-button>
        <el-button @click="resetForm('registerform')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      registerform: {
        stunumber: '',
        stuname: '',
        sex: 'boy',
        phonenum: '',
        email: '',
        qq: '',
        wechat: '',
        usertype: 'applicant',
        password: '',
        checkpass: ''
      }
    }
  },
  methods: {
    submitForm: function (formName) {
      console.log(formName)
      this.$router.push({name: 'login', params: {stunumber: formName.stunumber}})
    },
    resetForm: function (formName) {
      console.log(formName)
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    console.log(this.$route.params.stunumber)
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 5px;
}
</style>
