<template>
  <!--地图容器-->
  <div id="mainroutemap" class="mainroutemap"></div>
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
      mainimg: ""
    };
  },
  props: ["applyPosition", "repairPosition"],
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
      var map = new BMap.Map("mainroutemap");
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
            } else {
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
    }
  },
  mounted() {
    // 百度地图API功能
    var map = new BMap.Map("mainroutemap");
    map.centerAndZoom(
      new BMap.Point(
        this.$props.applyPosition.lng,
        this.$props.applyPosition.lat
      ),
      11
    );
    var walking = new BMap.WalkingRoute(map, {
      renderOptions: { map: map, autoViewport: true }
    });
    var pointA = new BMap.Point(
      this.$props.applyPosition.lng,
      this.$props.applyPosition.lat
    );
    var pointB = new BMap.Point(
      this.$props.repairPosition.lng,
      this.$props.repairPosition.lat
    );
    walking.search(pointA, pointB);
    var starIcon = new BMap.Icon(userimg, new BMap.Size(64, 64));
    var endIcon = new BMap.Icon(mainimg, new BMap.Size(64, 64));
    var distance = map.getDistance(pointA, pointB).toFixed(2);
    walking.setMarkersSetCallback(function(result) {
      result[0].marker.setIcon(starIcon);
      result[0].marker.setAnimation(BMAP_ANIMATION_BOUNCE);
      result[1].marker.setIcon(endIcon);
      result[1].marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    });
  }
};
</script>
<style scoped>

</style>