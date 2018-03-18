<template>
  <div class="system">
      <header>
        <h2>后台管理系统</h2>
        <div class="showuser"></div>
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
  </div>
</template>

<script>
import common from "../assets/js/common.js";
export default {
  name: "system",
  data() {
    return {};
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
  background-color: lightblue;
}
.system header {
  height: 80px;
  line-height: 80px;
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
}
.system main {
  background-color: green;
  float: right;
  position: absolute;
  bottom: 0;
  top: 80px;
  left: 150px;
  right: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 400px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
</style>
