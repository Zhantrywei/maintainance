<template>
  <div class="me">
      <header>
        <div class="returnBtn" @click="returnIndex">
          <icon name="chevron-left"></icon>
        </div>
        <h1>{{stuName}}</h1>
        <h2>{{roleName}}</h2>
      </header>
  </div>
</template>

<script>
import common from "../assets/js/common.js";
export default {
  name: 'me',
  data(){
    return {
      stuName: '',
      roleName: ''
    }
  },
  methods: {
    getInformation(){
      var stuName = common.getCookie("stuName");
      var roleName = common.getCookie("roleName");
      if(stuName && roleName){
        this.stuName = stuName;
        this.roleName = roleName;
        console.log("stuName:",stuName)
      }else {
        console.log("不存在用户信息请重新登录");
      }
    },
    returnIndex(){
      this.$router.push({
        name: "index"
      });
    }
  },
  beforeMount(){
    this.getInformation();
  }
}
</script>

<style scoped>

.me header {
  width: 100%;
  height: 50px;
  background-color: aqua;
}
.me header .returnBtn {
  position: absolute;
  /* top: 25px; */
  top: 13px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
}
.me .fa-icon {
  font-size: 25px;
}
.me header h1,h2 {
  text-align: center;
}
.me header h1 {
  font-size: 20px;
  line-height: 30px;
  height: 30px;
}
.me header h2 {
  font-size: 16px;
}
</style>
