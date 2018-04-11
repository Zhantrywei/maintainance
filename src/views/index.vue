<template>
  <div class="index">
    <header>
      <div class="user" >
        <router-link :to="{name: 'me'}" tag="div">
          <icon name="user" @click="usershow = true"></icon>
        </router-link>
      </div>
      <div class="location" v-show="showLocation">
        <i class="el-icon-location"></i>
        <span v-text="city"></span>
      </div>
      <div class="commenting" is-dot>
         <router-link :to="{name: 'commenting'}" tag="div">
          <icon  name="bell"></icon>           
         </router-link>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <nav style="z-index:1001;background-color:#E6E7E9">
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
      city: "定位中",
      menuList: [],
      showLocation: false,
      position: {},
      usershow: true
    };
  },
  methods: {
    getBMapLocation() {
      var that = this;
      var geolocation = new BMap.Geolocation;
      console.log(geolocation);
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // alert("经度：" + r.point.lng + " , " + "纬度：" + r.point.lat);
          var point = new BMap.Point(r.point.lng, r.point.lat); //用所定位的经纬度查找所在地省市街道等信息
          var gc = new BMap.Geocoder();
          gc.getLocation(point, function(rs) {
            console.log("rs: ",rs.addressComponents.city)
            that.city = rs.addressComponents.city;
            that.showLocation = true;
          });
          var stuId = common.getCookie("stuId");
          // that.$http.post('/api/user/position',{
          //   stuId: stuId,
          //   position: point
          // }).then(function(res){
          //   console.log(res);
          // }).catch(function(err){
          //   console.log(err);
          // })
        } else {
          console.log("failed " + this.getStatus());
          that.$alert("定位失败，请检查是否打开GPS定位", "定位提示", {
              confirmButtonText: "确定"
            });
        }
      });
    }
  },
  mounted() {
    this.getBMapLocation();
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

    // this.getBMapLocation();
  }
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  position: fixed;
  z-index: 1001;
}
/* .user,
.commenting {
  width: 0.4rem;
} */
.bm-view {
  width: 100%;
  height: 300px;
}
/* icon {
  font-size: 16px;
} */
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
nav li div{
  display: flex;
  justify-content: center;
  align-items: center;
}
nav li div span{
  margin-left: 5px;
}
nav li + li {
  border-left: 1px solid gray;
}

main {
  width: 100%;
  position: fixed;
  background-color: lightgreen;
  top: 50px;
  bottom: 50px;
}


@media screen and (min-width: 800px) and (max-width: 1000px) {
  .index {
    font-size: 0.5rem !important;
    vertical-align: middle;
  }
}
@media screen and (min-width: 1000px) {
  .index {
    font-size: 30px !important;
    vertical-align: middle;
  }
}
@media screen and (min-width: 320px) and (max-width: 800px) {
  .index {
    font-size: 20px !important;
    vertical-align: middle;
  }

}
</style>
