<template>
  <div class="login">
    <header class="login-header">
      <h1>Maintance</h1>
      <h2 class="text-right">很高兴为你服务</h2>
    </header>
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
        <el-col :span="12">
          <router-link :to="{name: 'forget'}">忘记密码?</router-link>
        </el-col>
        <el-col :span="12" class="text-right">
          <router-link :to="{name: 'register'}">新用户注册</router-link>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
    name: "login",
    methods: {
        login: function() {
            // this.$router.push({name: 'index'})
            this.$router.push({ name: "system" });
        }
    }
};
</script>

<style scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #e6e7e9;
    /* background-image: url(/static/img/bgimg.jpg); */
    background-position: top center;
    background-repeat: no-repeat;
    background-size: contain;
}
.form input {
    width: 100%;
    /* height: 30px; */
    height: 1.5rem;
    box-sizing: border-box;
    border-bottom: lightgray 1px solid;
    padding: 0 0.5rem;
    border-radius: 0.2rem;
    /* margin-bottom: 10px; */
    margin-bottom: 0.5rem;
}
.form button {
    width: 100%;
    /* height: 30px; */
    height: 1.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    outline: none;
}
.text-right {
    text-align: right;
}

@media screen and (min-width: 800px) {
    .login {
        background-image: url(/static/img/bgimg.jpg);
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 50%;
        font-size: 16px;
    }
    .login-header {
        width: 30%;
        height: 1.5rem;
        font-size: 16px;
        padding: 20px;
    }
    .form {
        position: absolute;
        top: 30%;
        right: 20px;
        width: 50%;
        height: 40%;
    }

    .form input {
        width: 100%;
        /* height: 30px; */
        height: 1rem;
        box-sizing: border-box;
        border-bottom: lightgray 1px solid;
        padding: 0 0.5rem;
        border-radius: 0.2rem;
        /* margin-bottom: 10px; */
        margin-bottom: 0.5rem;
    }

    .form button {
        width: 100%;
        /* height: 30px; */
        height: 1rem;
        border-radius: 4px;
        margin-bottom: 0.5rem;
        outline: none;
    }
}

@media screen and (min-width: 501px) and (max-width: 799px) {
    .login {
        font-size: 0.8rem;
        background-image: url(/static/img/bgimg.jpg);
        background-position: top center;
        background-repeat: no-repeat;
        background-size: contain;
    }
    .login-header {
        padding: 15rem 1rem 0 1rem;
        height: 3rem;
    }
}

@media screen and (min-width: 320px) and (max-width: 500px) {
    .login {
        font-size: 0.8rem;
        background-image: url(/static/img/bgimg.jpg);
        background-position: top center;
        background-repeat: no-repeat;
        background-size: contain;
    }
    .login-header {
        padding: 15rem 1rem 0 1rem;
        height: 3rem;
    }
    .form {
        margin-top: 0.5rem;
    }
}
</style>
