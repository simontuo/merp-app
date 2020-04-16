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
                        :model="form"
                        :rules="loginRules"
                        auto-complete="on"
                        label-position="left"
                        v-if="!logined"
                    >
                        <div class="title-container">
                            <h3 class="title">登录 MERP</h3>
                        </div>
                        <el-form-item prop="phone">
                            <span class="svg-container">
                                <svg-icon icon-class="mobile" />
                            </span>
                            <el-input
                                ref="phone"
                                v-model="form.phone"
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
                                    v-model="form.password"
                                    :type="passwordType"
                                    placeholder="密码"
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
                            <el-form-item prop="verify_code">
                                <span class="svg-container">
                                    <svg-icon icon-class="verify-code" />
                                </span>
                                <el-input
                                    ref="password"
                                    v-model="form.verify_code"
                                    placeholder="验证码"
                                    name="verify_code"
                                    tabindex="2"
                                    auto-complete="on"
                                    @keyup.enter.native="handleLogin"
                                />
                                <span class="show-pwd">
                                    <verify-code-button type="text" :phone="form.phone"></verify-code-button>
                                </span>
                            </el-form-item>
                        </template>
                        <div class="forget-password">
                            <el-button type="text" @click="swtichVerifyType">{{ verifyTypeText }}</el-button>

                            <el-button type="text" style="float:right;" @click="forget">忘记密码</el-button>
                        </div>
                        <el-button
                            :loading="loading"
                            type="primary"
                            style="width:100%;margin-bottom:30px;"
                            @click.native.prevent="handleLogin"
                        >登录</el-button>

                        <!-- <div class="tips">
                            <span style="margin-right:20px;">第三方登录</span>
                            <span>password: any</span>
                        </div>-->
                    </el-form>
                    <tenant-list v-else :tenants="tenants"></tenant-list>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { phone } from "@/utils/validate";
import { login } from "@/api/user";
import { tenantUserList } from "@/api/tenant";
import TenantList from "./components/TenantList";
import VerifyCodeButton from "@/components/VerifyCodeButton";

export default {
    name: "Login",
    components: { TenantList, VerifyCodeButton },
    data() {
        const validatePhone = (rule, value, callback) => {
            if (!phone(value)) {
                callback(new Error("请输入正确的手机号码"));
            } else {
                callback();
            }
        };
        return {
            verifyType: "password",
            verifyTypeText: "验证码登陆",
            form: {
                phone: "",
                password: ""
            },
            loginRules: {
                phone: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "手机号码不能为空"
                    },
                    {
                        validator: validatePhone
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能空",
                        trigger: "blur"
                    }
                ],
                verify_code: [
                    {
                        required: true,
                        message: "验证码不能空",
                        trigger: "blur"
                    }
                ]
            },
            loading: false,
            passwordType: "password",
            logined: false,
            tenants: []
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
            // todo
            // 发送验证用户身份请求，返回token和对应的租户列表
            this.$refs.loginForm.validate(valid => {
                if (!valid) {
                    return false;
                }

                this.loading = true;
                tenantUserList(this.form)
                    .then(response => {
                        this.tenants = response.data;
                        this.logined = true;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        swtichVerifyType() {
            if (this.verifyType == "password") {
                this.verifyType = "verify_code";
                this.verifyTypeText = "密码登录";
            } else {
                this.verifyType = "password";
                this.verifyTypeText = "验证码登录";
            }
        },
        forget() {
            this.$router.push({ name: "forgetPassword" || "/404" });
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

// $bg: #283443;
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
                box-shadow: 0 0 0px 1000px #f0f5ff inset !important;
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
        padding: 2px 5px 6px 15px;
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
