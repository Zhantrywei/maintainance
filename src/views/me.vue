<template>
  <div class="me">
    <header>
      <div class="returnBtn" @click="returnIndex">
        <icon name="chevron-left"></icon>
      </div>
      <div class="logout">登出</div>
    </header>
    <main>

      <div class="userimg">
        <icon name="user-circle-o"></icon>
      </div>
      <h1>{{stuName}}</h1>
      <h2>{{roleName}}</h2>
    </main>
  </div>
</template>

<script>
import common from "../assets/js/common.js";
export default {
    name: "me",
    data() {
        return {
            stuName: "",
            roleName: ""
        };
    },
    methods: {
        getInformation() {
            var stuName = common.getCookie("stuName");
            var roleName = common.getCookie("roleName");
            if (stuName && roleName) {
                this.stuName = stuName;
                this.roleName = roleName;
                console.log("stuName:", stuName);
            } else {
                console.log("不存在用户信息请重新登录");
            }
        },
        returnIndex() {
            this.$router.push({
                name: "index"
            });
        }
    },
    beforeMount() {
        this.getInformation();
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
    /* margin-left: 12px; */
}

.me header .logout {
  font-size: 16px;
  color: rgb(56, 53, 53);
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
    color: #5A554F;
}
.me h2 {
    font-size: 16px;
    color: #A6A39E;
}

.me .userimg .fa-icon {
    width: 100px;
    height: 100px;
    color: #3BC0A3;
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
</style>
