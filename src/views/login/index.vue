<template>
    <div class="login-container">
        <div class="login-card">
            <el-row :gutter="60">
                <el-col :span="12">
                    <div class="login-svg">
                        <!-- <el-image fit="contain" src="./svg/login.svg"></el-image> -->
                        <img src="./svg/login.svg" width="400" height="350" />
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form
                        ref="loginForm"
                        :model="loginForm"
                        :rules="loginRules"
                        auto-complete="on"
                        label-position="left"
                        v-if="!logined"
                    >
                        <div class="title-container">
                            <h3 class="title">Login Form</h3>
                        </div>
                        <el-form-item prop="username">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                ref="phone"
                                v-model="loginForm.phone"
                                placeholder="手机号码"
                                name="phone"
                                type="text"
                                tabindex="1"
                                auto-complete="on"
                            />
                        </el-form-item>
                        <template v-if="verifyType === 'password'">
                            <el-form-item prop="password">
                                <span class="svg-container">
                                    <svg-icon icon-class="password" />
                                </span>
                                <el-input
                                    :key="passwordType"
                                    ref="password"
                                    v-model="loginForm.password"
                                    :type="passwordType"
                                    placeholder="Password"
                                    name="password"
                                    tabindex="2"
                                    auto-complete="on"
                                    @keyup.enter.native="handleLogin"
                                />
                                <span class="show-pwd" @click="showPwd">
                                    <svg-icon
                                        :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                                    />
                                </span>
                            </el-form-item>
                        </template>
                        <template v-else>
                            <el-form-item prop="password">
                                <span class="svg-container">
                                    <svg-icon icon-class="password" />
                                </span>
                                <el-input
                                    ref="password"
                                    v-model="loginForm.verify_code"
                                    placeholder="验证码"
                                    name="verify_code"
                                    tabindex="2"
                                    auto-complete="on"
                                    @keyup.enter.native="handleLogin"
                                />
                                <span class="show-pwd" @click="showPwd">
                                    <verification-button type="text"></verification-button>
                                </span>
                            </el-form-item>
                        </template>
                        <div class="forget-password">
                            <el-button type="text">验证码登陆</el-button>
                            <el-button type="text" style="float:right;">忘记密码</el-button>
                        </div>
                        <el-button
                            :loading="loading"
                            type="primary"
                            style="width:100%;margin-bottom:30px;"
                            @click.native.prevent="handleLogin"
                        >登录</el-button>
                    </el-form>
                    <tenant-list v-else :tenants="tenants"></tenant-list>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { login } from "@/api/user";
import TenantList from "./components/TenantList";
import VerificationButton from "./components/VerificationCodeButton";

export default {
    name: "Login",
    components: { TenantList, VerificationButton },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error("Please enter the correct user name"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(
                    new Error("The password can not be less than 6 digits")
                );
            } else {
                callback();
            }
        };
        return {
            verifyType: "password1",
            loginForm: {
                username: "admin",
                // email: "2850132787@qq.com",
                password: "111111"
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername
                    }
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword
                    }
                ]
            },
            loading: false,
            passwordType: "password",
            redirect: undefined,
            logined: false,
            tenants: [
                {
                    name: "大力出奇迹有限公司",
                    default: false
                },
                {
                    name: "保级利亚有限公司",
                    default: false
                },
                {
                    name: "金坷垃大力有限公司",
                    default: false
                }
            ]
        };
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    methods: {
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.logined = true;
            return false;
            // todo
            // 发送验证用户身份请求，返回token和对应的租户列表

            // this.$refs.loginForm.validate(valid => {
            //     if (valid) {
            //         this.loading = true;
            //         this.$store
            //             .dispatch("user/login", this.loginForm)
            //             .then(() => {
            //                 this.$router.push({ path: this.redirect || "/" });
            //                 this.loading = false;
            //             })
            //             .catch(() => {
            //                 this.loading = false;
            //             });
            //     } else {
            //         console.log("error submit!!");
            //         return false;
            //     }
            // });
        }
    }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

// $bg: #283443;
// $light_gray: #fff;
// $cursor: #fff;

$bg: #283443;
$light_gray: #303133;
$cursor: #303133;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        // background: rgba(0, 0, 0, 0.1);
        background: #f0f5ff;
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
// $bg: #2d3a4b;
// $dark_gray: #889aa4;
// $light_gray: #eee;

$bg: #2d3a4b;
$dark_gray: #409eff;
$light_gray: #303133;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    padding-top: 160px;

    .login-card {
        background-color: #fff;
        padding: 50px;
        border-radius: 10px;
        width: 1040px;
        position: relative;
        max-width: 100%;
        margin: 0 auto;
        overflow: hidden;
    }

    // .login-form {
    //     width: 1040px;
    //     position: relative;
    //     max-width: 100%;
    //     padding: 160px 35px 0;
    //     margin: 0 auto;
    //     overflow: hidden;
    // }

    .forget-password {
        font-size: 14px;
        // color: #fff;
        color: $light_gray;
        margin-bottom: 20px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .tips {
        font-size: 14px;
        // color: #fff;
        color: $light_gray;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
