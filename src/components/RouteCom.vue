<template>
  <!--地图容器-->
  <div id="routemap" class="routemap"></div>
</template>
<script>
import common from "../assets/js/common";
import userimg from "../assets/img/computer.png";
import mainimg from "../assets/img/settings.png";
export default {
  name: "",
  data() {
    return {
      userimg: "",
      mainimg: "",
    };
  },
  methods: {
    getUserImg() {
      var that = this;
      var stuId = common.getCookie("stuId");
      this.$http
        .get("/api/user/getuserimg", {
          params: {
            stuId: stuId
          }
        })
        .then(function(res) {
          console.log(res);
          if (res.data.result) {
            that.userimg = res.data.result;
            that.showMap();
          } else {
            that.showMap();
          }
          console.log("userimg: ", that.userimg);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    showMap() {
      var that = this;
      console.log("ShowMap: ", BMap);
      // 百度地图API功能
      console.log("outMap： ", BMap);
      var map = new BMap.Map("routemap");
      var point = new BMap.Point();
      map.centerAndZoom(point, 18);

      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // if (that.userimg) {
            //   var myIcon = new BMap.Icon(that.userimg, new BMap.Size(18, 35));
            //   var mk = new BMap.Marker(r.point, { icon: myIcon });
            // } else {
            //   var mk = new BMap.Marker(r.point);
            // }
            if (that.$props.showImg) {
              var myIcon = new BMap.Icon(userimg, new BMap.Size(64, 64));
              var mk = new BMap.Marker(r.point, { icon: myIcon });
            }else{
              var mk = new BMap.Marker(r.point);              
            }

            map.addOverlay(mk);
            map.panTo(r.point);
            // alert("您的位置：" + r.point.lng + "," + r.point.lat);
          } else {
            alert("failed" + this.getStatus());
          }
        },
        { enableHighAccuracy: true }
      );
      //关于状态码
      //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
      //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
      //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
      //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
      //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
      //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
      //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
      //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
      //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
    }
  },
  mounted() {
  }
};
</script>
<style scoped>

</style>