<template>
  <div class="apply clearfix">
      <!-- <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler"></baidu-map> -->
      <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" ></bm-geolocation>
      </baidu-map>
  </div>
</template>

<script>
export default {
  name: "apply",
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      coords: ""
    };
  },
  methods: {
    handler({ BMap, map }) {
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 18);

      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            alert("您的位置：" + r.point.lng + "," + r.point.lat);
            var point = new BMap.Point(r.point.lng, r.point.lat); //用所定位的经纬度查找所在地省市街道等信息
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function(rs) {
              var addComp = rs.addressComponents;
              console.log(rs.address); //地址信息
              alert(rs.address); //弹出所在地址
            });
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
  beforeMount(){
    navigator.geolocation.getCurrentPosition(function(position){
      alert("位置: "+ position.coords.longitude +','+position.coords.latitude)
    })
  }
};
</script>

<style scoped>
.bm-view {
  position: absolute;
  top: 0;
  width: 100%;
  bottom: 0;
}
</style>
