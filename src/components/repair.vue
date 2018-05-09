<template>
    <div class="repair">
        <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
        </baidu-map>
        <div class="repairbutton">
            <el-button type="primary" @click="repairList=true" :disabled="btnDis">
                <i class="el-icon-edit-outline repairicon"></i> 我要维修</el-button>
        </div>
        <div class="repairList" v-show="repairList" @click.stop.self="repairList = false">
            <i class="el-icon-close closebtn" @click="repairList=false"></i>
            <el-table :data="repairData" style="width: 100%" height="500">
                <el-table-column type="expand" fixed>
                    <template slot-scope="props">
                        <el-form label-position="right" class="demo-table-expand">
                            <el-form-item label="报修用户学号">
                                <span>{{ props.row.applyUser.applyStuId }}</span>
                            </el-form-item>
                            <el-form-item label="报修用户姓名">
                                <span>{{ props.row.applyUser.applyName }}</span>
                            </el-form-item>
                            <el-form-item label="报修用户性别">
                                <span>{{ props.row.applyUser.applySex == 'boy'? '男': '女' }}</span>
                            </el-form-item>
                            <el-form-item label="报修用户邮箱">
                                <span>{{ props.row.applyUser.applyEmail }}</span>
                            </el-form-item>
                            <el-form-item label="报修用户电话">
                                <span>{{ props.row.applyUser.applyPhoneNum }}</span>
                            </el-form-item>
                            <el-form-item label="报修用户QQ" v-if="props.row.applyUser.applyQQ">
                                <span>{{ props.row.applyUser.applyQQ }}</span>
                            </el-form-item>
                            <el-form-item label="报修用户微信" v-if="props.row.applyUser.applyWechat">
                                <span>{{ props.row.applyUser.applyWechat }}</span>
                            </el-form-item>
                            <el-form-item label="报修用户头像" v-if="props.row.applyUser.applyUserImg">
                                <img :src="props.row.applyUser.applyUserImg" style="height:150px;">
                            </el-form-item>
                            <el-form-item label="报修主题">
                                <span>{{ props.row.questionTitle }}</span>
                            </el-form-item>
                            <el-form-item label="报修描述">
                                <span>{{ props.row.questionDes }}</span>
                            </el-form-item>
                            <el-form-item label="报修图片">
                                <img :src="props.row.questionImg" style="width:150px;height:150px;">
                            </el-form-item>
                            <el-form-item label="报修时间">
                                <span>{{ props.row.applyTime }}</span>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="mini" type="primary" @click="exam(props.$index, props.row)">接单</el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="序号" type="index" :index="indexMethod" fixed align="center"></el-table-column>
                <!-- <el-table-column label="学号" prop="applyStuId" align="center">
                </el-table-column> -->
                <el-table-column label="姓名" prop="applyUser.applyName" align="center">
                </el-table-column>
                <el-table-column label="联系方式" prop="applyUser.applyPhoneNum" align="center">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import common from '../assets/js/common'
import Bus from '../assets/js/bus'
export default {
  name: "repair",
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      repairList: false,
      repairData: [
        // {
        //     applyId: "5ad948db8d46b224f88458b4",
        //     applyStuId: "201441404409",
        //     applyName: "詹源伟",
        //     applyPosition: {
        //         lng: 114.02597366,
        //         lat: 22.54605355
        //     },
        //     applyPhoneNum: "13631782911",
        //     applyTime: "2018-4-20 14:10:44",
        //     maintainId: null,
        //     maintainStuId: null,
        //     maintainName: null,
        //     maintainPosition: null,
        //     maintainPhoneNum: "13802454324",
        //     maintainTime: null,
        //     completeTime: null,
        //     serviceStar: null,
        //     status: -1,
        //     questionTitle: "重装电脑",
        //     questionDes: "需要重装win10系统",
        //     questionImg:
        //         "http://localhost:3000/public/images/record/201441404409/ApplyImg1524204641273.jpg"
        // }
      ],
      btnDis: false
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
    },
    indexMethod(index) {
      return index + 1;
    },
    getRepairList() {
      var that = this;
      this.$http
        .get("/api/record/getRepairList")
        .then(function(res) {
            that.repairData = res.data.result;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    exam(index,row){
        var that = this;
        console.log("index: ",index);
        console.log("row: ",row);
        var repairId = row._id;
        var stuId = common.getCookie("stuId");
        var repairTime = common.showTime(new Date());
        console.log("repairTime:",repairTime);
        this.$http.post('/api/record/repair',{
            stuId: stuId,
            repairId: repairId,
            repairTime: repairTime
        }).then(function(res){
            if(res.data.status==1){
                that.$alert(res.data.msg, "接单提示", {
                  confirmButtonText: "确定",
                  callback: function() {
                    that.btnDis = true;
                    Bus.$emit("getStatus");
                    that.repairList = false;
                    that.getRepairList();
                  }
                });
            }
        }).catch(function(err){
            console.log(err);
        })
    }
  },
  mounted() {
    this.getRepairList();
  }
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
.repairList {
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
  overflow-y: auto;
}
.closebtn {
  position: absolute;
  right: 6%;
  top: calc(50% - 190px);
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
</style>
