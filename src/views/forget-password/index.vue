<template>
    <div class="login-container">
        <div class="login-card">
            <el-row :gutter="60">
                <el-col :span="12">
                    <div class="login-svg">
                        <!-- <el-image fit="contain" src="@/views/login/svg/login.svg"></el-image> -->
                        <img src="@/views/login/svg/login.svg" width="450" height="400" />
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form
                        ref="forgetPasswordForm"
                        :model="form"
                        :rules="loginRules"
                        auto-complete="on"
                        label-position="left"
                    >
                        <div class="title-container">
                            <h3 class="title">忘记密码</h3>
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
                        <el-form-item prop="verify_code">
                            <span class="svg-container">
                                <svg-icon icon-class="verify-code" />
                            </span>
                            <el-input
                                ref="verifyCode"
                                v-model="form.verify_code"
                                placeholder="验证码"
                                name="verify_code"
                                tabindex="2"
                                auto-complete="on"
                            />
                            <span class="show-pwd">
                                <verify-code-button type="text" :phone="form.phone"></verify-code-button>
                            </span>
                        </el-form-item>
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
                            />
                            <span class="show-pwd" @click="showPwd">
                                <svg-icon
                                    :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                                />
                            </span>
                        </el-form-item>
                        <el-form-item prop="confirm_password">
                            <span class="svg-container">
                                <svg-icon icon-class="password" />
                            </span>
                            <el-input
                                :key="confirmPasswordType"
                                ref="confirmPasswordType"
                                v-model="form.confirm_password"
                                :type="confirmPasswordType"
                                placeholder="确认密码"
                                name="confirm_password"
                                tabindex="2"
                                auto-complete="on"
                                @keyup.enter.native="submit"
                            />
                            <span class="show-pwd" @click="showConfirmPwd">
                                <svg-icon
                                    :icon-class="confirmPasswordType === 'password' ? 'eye' : 'eye-open'"
                                />
                            </span>
                        </el-form-item>
                        <el-button
                            :loading="loading"
                            type="primary"
                            class="submit-button"
                            @click.native.prevent="submit"
                        >提交</el-button>
                        <div class="tips">
                            <router-link :to="{path: '/login'}">
                                <el-button type="text">登录</el-button>
                            </router-link>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { phone } from "@/utils/validate";
import { userResetPassword } from "@/api/user";
import VerifyCodeButton from "@/components/VerifyCodeButton";

export default {
    name: "Login",
    components: { VerifyCodeButton },
    data() {
        const validatePhone = (rule, value, callback) => {
            if (!phone(value)) {
                callback(new Error("请输入正确的手机号码"));
            } else {
                callback();
            }
        };
        return {
            verifyTypeText: "验证码登陆",
            form: {
                phone: "",
                verify_code: "",
                password: "",
                confirm_password: ""
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
                verify_code: [
                    {
                        required: true,
                        message: "验证码不能空",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能空",
                        trigger: "blur"
                    }
                ],
                confirm_password: [
                    {
                        required: true,
                        message: "确认密码不能空",
                        trigger: "blur"
                    }
                ]
            },
            loading: false,
            passwordType: "password",
            confirmPasswordType: "password",
            redirect: undefined,
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
        showConfirmPwd() {
            if (this.confirmPasswordType === "password") {
                this.confirmPasswordType = "";
            } else {
                this.confirmPasswordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.confirmPasswordType.focus();
            });
        },
        submit() {
            this.$refs.forgetPasswordForm.validate(valid => {
                if (!valid) {
                    return false;
                }

                userResetPassword(this.form).then(response => {
                    this.$message.success(response.message);
                    this.$router.push({ path: "/login" });
                });
            });
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

    .submit-button {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>
