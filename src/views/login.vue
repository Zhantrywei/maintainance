<template>
    <div class="login">
        <header class="login-header">
            <h1>Maintance</h1>
            <h2 class="text-right">很高兴为你服务</h2>
        </header>
        <el-main class="form">
            <el-row>
                <el-col :xs="24"><input type="text" placeholder="学号" autofocus v-model="stuId"></el-col>
                <div v-show="showTip" class="tip text-right">请正确输入学号</div>
                <div v-show="showStuIdTip" class="tip text-right">请输入学号</div>
            </el-row>
            <el-row>
                <el-col :xs="24"><input type="password" placeholder="密码" autofocus v-model="pwd"></el-col>
                <div v-show="showPwdTip" class="tip text-right">请输入密码</div>
            </el-row>
            <el-row>
                <el-col :xs="24">
                    <button @click="login">登 录</button>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <!-- <el-col :span="12">
                    <router-link :to="{name: 'forget'}">忘记密码?</router-link>
                </el-col> -->
                <el-col :span="24" class="text-right">
                    <router-link :to="{name: 'register'}">新用户注册</router-link>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            stuId: "",
            pwd: "",
            showTip: false,
            showStuIdTip: false,
            showPwdTip: false
        };
    },
    watch: {
        stuId: function(val) {
            if (val.indexOf(".") != -1) {
                this.showTip = true;
            } else {
                var val = Number(val);
                if (isNaN(val)) {
                    // console.log(val);
                    this.showTip = true;
                } else {
                    console.log("val: ", val);
                }
            }
            if (val == "") {
                this.showTip = false;
            } else {
                this.showStuIdTip = false;
            }
        },
        pwd: function(val) {
            if (val != "") {
                this.showPwdTip = false;
            }
        }
    },
    methods: {
        login: function() {
            var that = this;
            if (this.stuId == "") {
                this.showStuIdTip = true;
            }
            if (this.pwd == "") {
                this.showPwdTip = true;
                return false;
            }
            console.log("学号: ", this.stuId);
            console.log("密码: ", this.pwd);
            this.$http
                .post("/api/user/login", {
                    stuId: this.stuId,
                    pwd: this.pwd
                })
                .then(function(res) {
                    console.log("res: ", res);
                    if (res.data.status == 0) {
                        that.$alert(res.data.msg, "登录提示", {
                            confirmButtonText: "确定"
                        });
                    } else if (res.data.status == 1) {
                        if (res.data.result.roleId == 0) {
                            that.$router.push({ name: "system" });
                        } else {
                            that.$router.push({name: 'index'})
                        }
                    }
                })
                .catch(function(err) {
                    console.log("err: ", err);
                });
        }
    }
};
</script>

<style scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #e6e7e9;
    /* background-image: url(/static/img/bgimg.jpg); */
    background-position: top center;
    background-repeat: no-repeat;
    background-size: contain;
}
.form input {
    position: relative;
    width: 100%;
    /* height: 30px; */
    height: 1.5rem;
    box-sizing: border-box;
    border-bottom: lightgray 1px solid;
    padding: 0 0.5rem;
    border-radius: 0.2rem;
    /* margin-bottom: 10px; */
    margin-bottom: 0.5rem;
}
.form button {
    width: 100%;
    /* height: 30px; */
    height: 1.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    outline: none;
}
.text-right {
    text-align: right;
}
.tip {
    position: absolute;
    top: 0rem;
    right: 0;
    color: #b54143;
}

@media screen and (min-width: 800px) {
    .login {
        background-image: url(/static/img/bgimg.jpg);
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 50%;
        font-size: 16px;
    }
    .login-header {
        width: 100%;
        height: 1.5rem;
        font-size: 30px;
        padding: 20px;
    }
    .login-header h1, h2 {
        display: inline-block;
        margin-right: 40px;
    }
    .form {
        position: absolute;
        top: 30%;
        right: 20px;
        width: 50%;
    }

    .form input {
        width: 100%;
        /* height: 30px; */
        height: 0.8rem;
        box-sizing: border-box;
        border-bottom: lightgray 1px solid;
        padding: 0 0.2rem;
        border-radius: 0.2rem;
        /* margin-bottom: 10px; */
        /* margin-bottom: 0.5rem; */
    }

    .form button {
        width: 100%;
        /* height: 30px; */
        height: 0.8rem;
        border-radius: 4px;
        margin-bottom: 0.5rem;
        outline: none;
    }
    .tip {
        font-size: 20px;
        position: absolute;
        right: 0;
        top: 0.8rem;
    }
}

@media screen and (min-width: 501px) and (max-width: 799px) {
    .login {
        font-size: 0.8rem;
        background-image: url(/static/img/bgimg.jpg);
        background-position: top center;
        background-repeat: no-repeat;
        background-size: contain;
    }
    .login-header {
        padding: 15rem 1rem 0 1rem;
        height: 3rem;
    }
    .form input {
        margin-bottom: 1rem;
    }
    .tip {
        font-size: 20px;
        position: absolute;
        right: 0;
        top: 1.6rem;
    }
}

@media screen and (min-width: 320px) and (max-width: 500px) {
    .login {
        font-size: 0.8rem;
        background-image: url(/static/img/bgimg.jpg);
        background-position: top center;
        background-repeat: no-repeat;
        background-size: contain;
    }
    .login-header {
        padding: 15rem 1rem 0 1rem;
        height: 3rem;
    }
    .form {
        margin-top: 0.5rem;
    }
    .form input {
        margin-bottom: 1rem;
    }
    .tip {
        font-size: 16px;
        position: absolute;
        right: 0;
        top: 1.6rem;
    }
}
</style>
