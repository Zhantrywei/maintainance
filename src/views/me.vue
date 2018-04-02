<template>
    <div class="me">
        <header>
            <div class="returnBtn" @click="returnIndex">
                <icon name="chevron-left"></icon>
            </div>
            <div class="logout">登出</div>
        </header>
        <main>
            <div class="userimg">
                <icon name="user-circle-o"></icon>
            </div>
            <h1>{{stuName}}</h1>
            <h2>{{roleName}}</h2>
            <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#DADADA" text-color="#41C0A3" active-text-color="#41C0A3" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">个人信息</el-menu-item>
                <el-menu-item index="2">报修详情</el-menu-item>
            </el-menu>
            <el-form v-if="tabshow" class="changeForm" ref="changeForm" :rules="rules" size="medium" label-position="right" :model="changeForm" label-width="80px">
                <!-- 不可以修改的：学号，性别，姓名，用户类型，身份证照片，学生证照片； -->
                <!-- 可以修改的：联系方式，电子邮箱，QQ号码，微信，年龄，密码； -->
                <el-form-item label="学号" prop="stuId">
                    <span>{{changeForm.stuId}}</span>
                </el-form-item>
                <el-form-item label="性别" prop="sex" class="user-sex">
                    <span>{{changeForm.sex}}</span>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <span>{{changeForm.age}}</span>
                </el-form-item>
                <el-form-item label="联系方式" prop="phoneNum">
                    <span v-if="resetShow">{{changeForm.phoneNum}}</span>
                    <el-input v-else v-model="changeForm.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <span v-if="resetShow">{{changeForm.email}}</span>
                    <el-input v-else v-model="changeForm.email"></el-input>
                </el-form-item>
                <el-form-item label="QQ号码" prop="qq">
                    <span v-if="resetShow">{{changeForm.qq}}</span>
                    <el-input v-else v-model="changeForm.qq"></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="wechat">
                    <span v-if="resetShow">{{changeForm.wechat}}</span>
                    <el-input v-else v-model="changeForm.wechat"></el-input>
                </el-form-item>
                <el-form-item v-if="!resetShow" label="密码" prop="password">
                    <el-input  v-model="changeForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item v-if="!resetShow" label="确认密码" prop="checkpass">
                    <el-input v-model="changeForm.checkpass" type="password"></el-input>
                </el-form-item>
                <el-form-item v-if="resetShow" label-width="0px" class="buttonshow">
                    <el-button type="primary" @click="resetShow=false">修改个人信息</el-button>
                </el-form-item>
                <el-form-item v-else label-width="0px" class="buttonshow">
                    <el-button type="primary" @click="submitForm('changeForm')">保存</el-button>
                    <el-button @click="resetForm('changeForm')">重置</el-button>
                    <el-button @click="resetShow = true">取消</el-button>
                </el-form-item>

            </el-form>
            <ul v-else>
                <li>1</li>
                <li>2</li>
            </ul>
        </main>
    </div>
</template>

<script>
import common from "../assets/js/common.js";
export default {
    name: "me",
    data() {
        return {
            stuName: "",
            roleName: "",
            changeForm: {
                stuId: "201441404409",
                sex: "男",
                age: 18,
                phoneNum: "13631782911",
                email: "844945330@qq.com",
                qq: "844945330",
                wechat: "844945330",
                password: '',
                checkpass: ''
            },
            activeIndex: "1",
            resetShow: true,
            rules: {},
            tabshow: true
        };
    },
    methods: {
        getInformation() {
            var stuName = common.getCookie("stuName");
            var roleName = common.getCookie("roleName");
            var stuId = common.getCookie("stuId");
            if (stuName && roleName) {
                this.stuName = stuName;
                this.roleName = roleName;
                console.log("stuName:", stuName);
            } else {
                console.log("不存在用户信息请重新登录");
            }
        },
        returnIndex() {
            this.$router.push({
                name: "index"
            });
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            this.tabshow = !this.tabshow;
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    beforeMount() {
        this.getInformation();
    }
};
</script>

<style scoped>
.me {
    width: 100%;
    height: 100%;
    /* background-color: rgba(247, 247, 249, 0.2); */
}

.me header {
    width: 100%;
    height: 50px;
    /* background-color: aqua; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
}
.me header .returnBtn {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #41C0A3;
    /* margin-left: 12px; */
}

.me header .logout {
    font-size: 16px;
    color: #41C0A3;
}
.me header .logout:active {
    position: relative;
    top: 1px;
    left: 1px;
}
.me .fa-icon {
    font-size: 17px;
}
.me h1,
h2 {
    text-align: center;
}
.me h1 {
    font-size: 20px;
    line-height: 30px;
    height: 30px;
    color: #5a554f;
}
.me h2 {
    font-size: 16px;
    color: #a6a39e;
}

.me .userimg .fa-icon {
    width: 100px;
    height: 100px;
    color: #3bc0a3;
    /* background-color: black; */
    font-size: 80px;
    /* left: calc(50% - 50px); */
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -10px;
}

.el-menu-demo {
    width: 100%;
    font-size: 20px;
}

.el-menu-demo li {
    width: 50%;
    text-align: center;
}

.changeForm {
    width: 250px;
    margin: 20px auto;
    box-sizing: border-box;
    /* background: pink; */
}

.buttonshow {
    text-align: right;
}
</style>
