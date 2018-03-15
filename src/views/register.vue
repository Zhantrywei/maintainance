<template>
    <div class="register">
        <h1>用户注册</h1>
        <el-form ref="registerform" :rules="rules" label-width="100px" size="medium" :inline="inline" label-position="right" :model="registerform">
            <el-form-item label="学号" prop="stuId">
                <el-input v-model="registerform.stuId" type="number"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="stuName">
                <el-input v-model="registerform.stuName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNum">
                <el-input v-model="registerform.phoneNum" type="number"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="registerform.email"></el-input>
            </el-form-item>
            <el-form-item label="QQ号码" prop="qq">
                <el-input v-model="registerform.qq" type="number"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="wechat">
                <el-input v-model="registerform.wechat"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <!-- <el-input v-model="registerform.age" type="number" :min='0' :max='150'></el-input> -->
                <el-input-number v-model="registerform.age" controls-position="right" :min="1" :max="130"></el-input-number>
            </el-form-item>
            <el-form-item label="性别" prop="sex" class="user-sex">
                <el-radio-group v-model="registerform.sex">
                    <el-radio label="boy">男</el-radio>
                    <el-radio label="girl">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="用户类型" prop="usertype" class="user-type">
                <el-radio-group v-model="registerform.usertype">
                    <el-radio label="applicant">报修用户</el-radio>
                    <el-radio label="maintainer">维修用户</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证照片" prop="IDCardImg" class="upload-img" v-if="imgShow">
                <el-upload class="upload-demo" action="/api/user/upload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                </el-upload>
            </el-form-item>
            <el-form-item label="学生证照片" prop="StuCardImg" class="upload-img" v-if="imgShow">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                </el-upload>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="registerform.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpass">
                <el-input v-model="registerform.checkpass" type="password"></el-input>
            </el-form-item>
            <el-form-item class="button-area">
                <el-button type="primary" @click="submitForm('registerform')">注册</el-button>
                <el-button @click="resetForm('registerform')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "register",
    data() {
        //校验密码
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.registerform.checkPass !== "") {
                    this.$refs.registerform.validateField("checkpass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.registerform.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            registerform: {
                stuId: "",
                stuName: "",
                sex: "boy",
                phoneNum: "",
                email: "",
                age: "",
                qq: "",
                wechat: "",
                usertype: "applicant",
                password: "",
                checkpass: ""
            },
            fileList2: [],
            imgShow: false,
            inline: true,
            rules: {
                stuId: [
                    { required: true, message: "请输入学号", trigger: "blur" },
                    {
                        min: 1,
                        max: 20,
                        message: "长度在1-20个数字",
                        trigger: "blur"
                    }
                ],
                stuName: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                phoneNum: [
                    {
                        required: true,
                        message: "请输入联系方式",
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱地址",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在6-20个字符",
                        trigger: "blur"
                    },
                    {
                        validator: validatePass,
                        trigger: "blur"
                    }
                ],
                checkpass: [
                    {
                        required: true,
                        message: "请输入确认密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在6-20个字符",
                        trigger: "blur"
                    },
                    {
                        validator: validatePass2,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        watchUserType() {
            return this.registerform.usertype;
        }
    },
    watch: {
        watchUserType: function(newValue, oldValue) {
            console.log("usertype: ", newValue);
            if (newValue === "maintainer") {
                this.imgShow = true;
            } else {
                this.imgShow = false;
            }
        }
    },
    methods: {
        submitForm: function(formName) {
            var that = this;
            // console.log(formName);
            // this.$router.push({
            //     name: "login",
            //     params: { stuId: formName.stuId }
            // });
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // alert("submit!");
                    console.log(this.registerform);
                    this.$http
                        .post("/api/user/register", {
                            registerform: this.registerform
                        })
                        .then(function(res) {
                            console.log("res: ", res);
                            if (res.data.status == 1) {
                                that.$alert(res.data.msg, "注册提示", {
                                    confirmButtonText: "前往登录",
                                    callback: action => {
                                        that.$router.push({ name: "login" });
                                    }
                                });
                            } else {
                                that.$alert(res.data.msg, "注册提示", {
                                    confirmButtonText: "确定",
                                    callback: action => {
                                        that.$router.push({ name: "login" });
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
        resetForm: function(formName) {
            console.log(formName);
            this.$refs[formName].resetFields();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    },
    mounted() {
        // console.log(this.$route.params.stuId);
    }
};
</script>

<style scoped>
.register {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}
h1 {
    font-size: 50px;
    width: 100%;
    height: 100px;
    line-height: 100px;
    margin-bottom: 10px;
}
form {
    font-size: 0.36rem;
}
.el-input-number--medium {
    width: 100px;
}
@media screen and (min-width: 670px) {
    .register {
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
    }
    h1 {
        font-size: 50px;
        width: 100%;
        height: 100px;
        line-height: 100px;
        margin-bottom: 10px;
    }
    form {
        font-size: 27px;
        padding-left: 4%;
    }
    .el-form-item {
        width: 48%;
        /* text-align: right; */
    }
    .user-type,
    .upload-img,
    .user-sex {
        width: 100%;
    }
    .button-area {
        width: 85%;
        text-align: right;
    }
    .el-upload__tip {
        margin-left: 10px;
    }
}
@media screen and (min-width: 320px) and (max-width: 669px) {
    .register {
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
    }
    h1 {
        font-size: 1rem;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        margin-bottom: 10px;
    }
    form {
        font-size: 0.36rem;
        /* padding-left: 4%; */
    }
    .user-type,
    .upload-img {
        width: 100%;
    }
    .button-area {
        width: 100%;
        text-align: right;
    }
    .el-upload__tip {
        margin-left: 10px;
    }
}
</style>
