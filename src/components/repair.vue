<template>
  <div class="repair">
    <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
    </baidu-map>
    <div class="repairbutton">
      <el-button type="primary" @click="repairList=true">
        <i class="el-icon-edit-outline repairicon"></i> 我要维修</el-button>
    </div>
  </div>
</template>

<script>
export default {
    name: "repair",
    data() {
        return {
            center: { lng: 0, lat: 0 },
            zoom: 3
        };
    },
    methods: {
        handler({ BMap, map }) {
            var that = this;
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(
                function(r) {
                    console.log("r: ", typeof r);
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        // map.panTo(r.point);
                        var point = new BMap.Point(r.point.lng, r.point.lat); //用所定位的经纬度查找所在地省市街道等信息
                        map.centerAndZoom(r.point, 18);
                        // mk.setAnimation(BMAP_ANIMATION_BOUNCE);
                    } else {
                        alert("failed" + this.getStatus());
                    }
                },
                { enableHighAccuracy: true }
            );
            //   //关于状态码
            //   //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
            //   //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
            //   //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
            //   //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
            //   //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
            //   //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
            //   //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
            //   //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
            //   //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
        }
    },
    mounted() {}
};
</script>

<style scoped>
.bm-view {
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
    z-index: 0;
}
.repairbutton {
    position: absolute;
    bottom: 20px;
    left: 10px;
    z-index: 999;
    /* background-color: blue; */
    /* width: 500px; */
    /* height: 500px; */
}
.repairicon {
    font-size: 20px;
}

@media screen and (min-width: 320px) and (max-width: 600px) {
    .repairbutton {
        position: absolute;
        bottom: 10px;
        left: 0;
        z-index: 999;
        /* background-color: blue; */
        width: 100%;
        box-sizing: border-box;
        /* height: 500px; */
        text-align: center;
    }
}
</style>
