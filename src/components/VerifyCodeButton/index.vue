<template>
    <el-button :type="type" @click="sentVerifyCode" :disabled="count">{{ timingText }}</el-button>
</template>

<script>
import { sentVerifyCode } from "@/api/sms";

export default {
    props: {
        type: {
            type: String,
            default: ""
        },
        verifyType: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            timingText: "获取验证码",
            count: false,
            wait: 60
        };
    },
    methods: {
        sentVerifyCode() {
            this.timing();
            // TODO 发送验证码
            sentVerifyCode({ phone: this.phone, type: this.verifyType });
        },
        timing() {
            let that = this;
            if (this.wait === 0) {
                this.timingText = "获取验证码";
                this.wait = 60;
                this.count = false;
            } else {
                this.count = true;
                this.timingText = this.wait + "s";
                this.wait--;
                setTimeout(function() {
                    that.timing();
                }, 1000);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>