<template>
    <div class="apply clearfix">
        <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true">
            <!-- <bm-view class="map">
            </bm-view> -->
            <bm-walking :panel="false" :start="markerPoint" @markersset="markersset" :end="maintainPoint" :auto-viewport="true" v-show="bmWalkingShow"></bm-walking>
        </baidu-map>
        <div class="applybutton">
            <el-button type="primary" @click="applyList=true" :disabled="applyDisabled">
                <i class="el-icon-edit-outline applyicon"></i> 我要报修</el-button>
        </div>
        <div class="applyList" v-show="applyList" @click.stop.self="applyList = false">
            <i class="el-icon-close closebtn" @click="applyList=false"></i>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label-width="0px" style="text-align:center;">
                    <h2>报修单</h2>
                </el-form-item>
                <el-form-item label="主题" prop="theme">
                    <el-input v-model="form.theme" placeholder="请输入主题"></el-input>
                </el-form-item>
                <el-form-item label="报修内容" prop="content">
                    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" placeholder="请输入内容" v-model="form.content">
                    </el-input>
                </el-form-item>
                <el-form-item label="图片上传" prop="images" class="is-required">
                    <el-upload class="upload-demo" :data="pictureData" action="/api/record/upload" :limit="1" list-type="picture" name="ApplyImg" :on-success="uploadSuccess" :on-remove="handleRemove">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div class="el-form-item__error" v-show="tipshow">
                            请上传图片
                        </div>
                        <!-- <span slot="tip" class="el-upload__tip"> 最多上传3张 </span> -->
                    </el-upload>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button type="primary" @click="submitForm('form')">确定</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div class="showtable" v-show="showtable">
            <el-table :data="applyData" style="width: 100%">
                <el-table-column type="expand" align="center">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="学号">
                                <span>{{ props.row.applyStuId }}</span>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <span>{{ props.row.applyName }}</span>
                            </el-form-item>
                            <el-form-item label="报修时间">
                                <span>{{ props.row.applyTime }}</span>
                            </el-form-item>
                            <el-form-item label="维修状态">
                                <span>{{ props.row.status == -1?'未接单': '已接单' }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="序号" align="center">
                </el-table-column>
                <el-table-column label="报修主题" align="center" prop="questionTitle">
                </el-table-column>
                <el-table-column label="报修时间" align="center" prop="applyTime">
                </el-table-column>
            </el-table>
        </div> -->

    </div>
</template>

<script>
import common from "../assets/js/common";
export default {
    name: "apply",
    data() {
        return {
            center: { lng: 0, lat: 0 },
            zoom: 3,
            coords: "",
            address: "",
            applyList: false,
            form: {
                theme: "",
                content: "",
                images: null,
                tmpImages: null
            },
            rules: {
                theme: [
                    {
                        required: true,
                        message: "请输入报修主题",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 10,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "请输入报修内容",
                        trigger: "blur"
                    },
                    {
                        min: 10,
                        max: 500,
                        message: "长度在 10 到 500个字符",
                        trigger: "blur"
                    }
                ]
            },
            markerPoint: { lng: 0, lat: 0 },
            maintainPoint: { lng: 0, lat: 0 },
            tipshow: false,
            pictureData: {
                stuId: common.getCookie("stuId")
            },
            applyData: [
                {
                    _id: "5acdc8806e3cfd49541e6307",
                    applyId: "5acd916f8f938448d8b040d9",
                    applyStuId: "201441404409",
                    applyName: "普通用户",
                    applyPosition: { lng: 114.02597366, lat: 22.54605355 },
                    applyTime: "2018-4-11 16:34:8",
                    maintainId: null,
                    maintainStuId: null,
                    maintainName: null,
                    maintainPosition: null,
                    maintainTime: null,
                    completeTime: null,
                    serviceStar: null,
                    status: -1,
                    questionTitle: "重装系统",
                    questionDes: "重装系统重装系统重装系统重装系统",
                    questionImg:
                        "http://localhost:3000/public/images/record/201441404409/ApplyImg1523435647093.jpg"
                }
            ],
            showtable: false,
            applyDisabled: false,
            bmWalkingShow: false
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
                        that.markerPoint = {
                            lng: r.point.lng,
                            lat: r.point.lat
                        };
                        console.log("markerPoint: ", that.markerPoint);
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.form.images = null;
            this.form.tmpImages = null;
        },
        submitForm(formName) {
            var that = this;
            this.$refs[formName].validate(valid => {
                if (that.form.images == null) {
                    that.tipshow = true;
                    return false;
                }
                if (valid) {
                    console.log(that.markerPoint);
                    this.$http
                        .post("/api/record/apply", {
                            applyId: common.getCookie("userId"),
                            applyStuId: common.getCookie("stuId"),
                            applyName: common.getCookie("stuName"),
                            applyForm: that.form,
                            applyPosition: that.markerPoint,
                            applyTime: common.showTime(new Date().valueOf())
                        })
                        .then(function(res) {
                            console.log("res: ", res);
                            if (res.data.status == 1) {
                                that.$alert(res.data.msg, "报修提示", {
                                    confirmButtonText: "确定",
                                    callback: function() {
                                        that.applyList = false;
                                    }
                                });
                            } else {
                                that.$alert(res.data.msg, "报修提示", {
                                    confirmButtonText: "确定",
                                    callback: function() {
                                        that.applyList = false;
                                    }
                                });
                            }
                        })
                        .catch(function(err) {
                            console.log("err: ", err);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.tipshow = false;
        },
        uploadSuccess(response, file, fileList) {
            console.log("uploadres: ", response.result.imgUrl);
            this.form.images = response.result.imgUrl;
            this.form.tmpImages = response.result.tmpUrl;
            console.log(this.form.images);
            this.tipshow = false;
        },
        getApplyList() {
            var that = this;
            this.$http
                .post("/api/record/getlist", {
                    applyStuId: common.getCookie("stuId")
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        console.log("testres: ", res);
                        if (res.data.result == null) {
                            //可以申请报修
                            that.applyDisabled = false;
                        } else {
                            //不可以申请报修
                            that.applyDisabled = true;
                            that.showtable = true;
                        }
                    } else {
                        that.$alert(res.data.msg, "提示", {
                            confirmButtonText: "确定",
                            callback: function() {}
                        });
                    }
                })
                .catch(function(err) {
                    console.log("err: ", err);
                });
        },
        //标注完成
        markersset() {
            console.log("标注完成");
        }
    },
    mounted() {
        // this.getApplyList();
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

.el-form {
    width: 90%;
    border-radius: 10px;
    background: white;
    padding: 20px;
    box-sizing: border-box;
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
@media screen and (min-width: 600px) {
}

/* .showtable {
    width: ;
} */

.BMap_Marker {
    display: none;
}
.BMap_noprint {
    display: none;
}
</style>
