<template>
  <div class="index">
    <header>
      <div class="user" >
        <router-link :to="{name: 'me'}" tag="div">
          <icon name="user"></icon>
        </router-link>
      </div>
      <div class="location" v-show="showLocation">
        <icon name="location-arrow"></icon>
        <span v-text="location"></span>
      </div>
      <div class="commenting">
         <router-link :to="{name: 'commenting'}" tag="div">
        <icon name="commenting"></icon>
         </router-link>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <nav>
        <li v-for="(item,index) in menuList" :key="index">
            <router-link :to="{name: item.routername}" tag="div">
            <icon :name="item.iconname"></icon>
            <span v-text="item.name"></span>
            </router-link>
        </li>
    </nav>
  </div>
</template>

<script>
import common from "../assets/js/common.js";
export default {
  name: "index",
  data() {
    return {
      location: "正在定位中",
      menuList: [],
      showLocation: false,
      position: {},
      userShow: true
    };
  },
  methods: {
    getLocation() {
        console.log("getLocation");
        navigator.geolocation.getCurrentPosition(function(position){
            alert(position);
        })
    }
  },
  mounted() {
  },
  updated() {
    console.log("router: ", this.$route.path);
    if (this.$route.path == "/index") {
      if (common.getCookie("roleId") == 1) {
        this.$router.push({
          name: "repair"
        });
      } else if (common.getCookie("roleId") == 2) {
        this.$router.push({
          name: "apply"
        });
      } else {
        this.$router.push({
          name: "login"
        });
      }
    }
  },
  beforeMount() {
    console.log("roleId: ", common.getCookie("roleId"));
    // 检测roleId,初始化menuList
    if (common.getCookie("roleId") == 1) {
      console.log("维修用户进入首页,初始化维修菜单");
      this.menuList = [
        {
          routername: "repair",
          iconname: "wrench",
          name: "维修"
        },
        {
          routername: "share",
          iconname: "support",
          name: "圈子"
        }
      ];
      this.$router.push({
        name: "repair"
      });
    } else if (common.getCookie("roleId") == 2) {
      console.log("普通用户进入首页,初始化维修菜单");
      this.menuList = [
        {
          routername: "apply",
          iconname: "pencil",
          name: "报修"
        },
        {
          routername: "share",
          iconname: "support",
          name: "圈子"
        }
      ];
      this.$router.push({
        name: "apply"
      });
    } else {
      this.$router.push({
        name: "login"
      });
    }
    
      this.getLocation();
  }
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  /* width: 100%; */
  height: 50px;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
}
.user,
.commenting {
  width: 0.4rem;
}
.bm-view {
  width: 100%;
  height: 300px;
}
icon {
  font-size: 16px;
}
nav {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
}
nav li {
  width: 50%;
  height: 50px;
  border-top: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
nav li + li {
  border-left: 1px solid gray;
}

main {
  width: 100%;
  position: absolute;
  background-color: lightgreen;
  top: 50px;
  bottom: 50px;
}

@media screen and (min-width: 800px) {
  .index {
    font-size: 0.4rem;
    vertical-align: middle;
  }
}
</style>
