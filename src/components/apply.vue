<template>
  <div class="apply clearfix">
    <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
    </baidu-map>
    <div class="applybutton">
      <el-button type="primary" @click="applylist=true">
        <i class="el-icon-edit applyicon"></i> 我要报修</el-button>
    </div>
    <div class="applyList" v-show="applyList">
      <form class="applyForm">
        <label for="applyTitle">主题:</label>
        <el-input id="applyTitle" size="small" v-model="applyTitle" placeholder="请输入报修主题"></el-input>
        
      </form>
    </div>
  </div>
</template>

<script>
export default {
    name: "apply",
    data() {
        return {
            center: { lng: 0, lat: 0 },
            zoom: 3,
            coords: "",
            address: "",
            applyList: true,
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            }
        };
    },
    methods: {
        handler({ BMap, map }) {
            // var point = new BMap.Point(116.331398, 39.897445);
            // map.centerAndZoom(point, 18);

            var that = this;

            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(
                function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        // map.panTo(r.point);
                        var point = new BMap.Point(r.point.lng, r.point.lat); //用所定位的经纬度查找所在地省市街道等信息
                        map.centerAndZoom(r.point, 18);
                        mk.setAnimation(BMAP_ANIMATION_BOUNCE);
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
    beforeMount() {
        // navigator.geolocation.getCurrentPosition(function(position){
        //   alert("位置: "+ position.coords.longitude +','+position.coords.latitude)
        // })
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
.applybutton {
    position: absolute;
    bottom: 20px;
    left: 10px;
    z-index: 999;
    /* background-color: blue; */
    /* width: 500px; */
    /* height: 500px; */
}
.applyicon {
    font-size: 20px;
}

.applyList {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.applyForm {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;

    background-color: pink;
}

@media screen and (min-width: 320px) and (max-width: 600px) {
    .applybutton {
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
@media screen and (min-width: 600px) {
}
</style>
