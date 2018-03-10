<template>
  <el-container class="login">
    <el-header class="login-header">
      <el-row>
        <el-col :xs="24">
          <h1>Maintance</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24">
          <h2 class="text-right">很高兴为你服务</h2>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="form">
      <el-row>
        <el-col :xs="24"><input type="text" placeholder="学号" autofocus></el-col>
      </el-row>
      <el-row>
        <el-col :xs="24"><input type="password" placeholder="密码" autofocus></el-col>
      </el-row>
      <el-row>
        <el-col :xs="24">
          <button @click="login">登 录</button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="12">
          <router-link :to="{name: 'forget'}">忘记密码?</router-link>
        </el-col>
        <el-col :xs="12" class="text-right">
          <router-link :to="{name: 'register'}">新用户注册</router-link>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'login',
  methods: {
    login: function () {
      this.$router.push({name: 'index'})
      // this.$router.push({name: 'system'})
    }
  }
}
</script>

<style scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #e6e7e9;
    background-image: url(/static/img/bgimg.jpg);
    background-position: top center;
    background-repeat: no-repeat;
    background-size: contain;
}
.login-header {
    margin-top: 300px;
}
.form input {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    border-bottom: lightgray 1px solid;
    padding: 0px 5px;
    border-radius: 4px;
    margin-bottom: 10px;
}
.form button {
    width: 100%;
    height: 30px;
    border-radius: 4px;
    margin-bottom: 10px;
    outline: none;
}
.text-right {
    text-align: right;
}
</style>
