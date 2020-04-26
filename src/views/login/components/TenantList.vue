<template>
    <div class="tenant-container">
        <div class="title-container">
            <p class="title">选择租户:</p>
        </div>
        <ul class="tenant-list">
            <li class="item" v-for="(item, index) in tenants" :key="index">
                <el-link :underline="false" @click="handelRedirect(item)">{{ item.name }}</el-link>
                <el-link :underline="false" class="default-button" @click="handelDefault">默认</el-link>
            </li>
        </ul>
        <div class="footer clearfix">
            <el-button type="text" class="footer-button" @click.native="logout">退出登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tenants: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            loginForm: {
                username: "admin",
                // email: "2850132787@qq.com",
                password: "111111"
            }
        };
    },
    methods: {
        handelRedirect(tenant) {
            // todo
            // 跳转到首页
            // 暂时用默认登录跳转
            // this.loading = true;
            // this.$store
            //     .dispatch("user/login", this.loginForm)
            //     .then(() => {
            //         this.$router.push({ path: this.redirect || "/" });
            //         this.loading = false;
            //     })
            //     .catch(() => {
            //         this.loading = false;
            //     });
            this.$store.dispatch("user/setTenant", tenant).then(() => {
                this.$router.push({ path: this.redirect || "/" });
            });
        },
        handelDefault() {
            this.$confirm("此操作将默认选择该租户登录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    // todo
                    // 发送确认默认租户请求
                    this.$message({
                        type: "success",
                        message: "默认成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消默认操作"
                    });
                });
        },
        async logout() {
            await this.$store.dispatch("user/logout").then(() => {
                this.$router.go(0);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.tenant-container {
    // background-color: #f0f5ff;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;

    .title-container {
        position: relative;

        .title {
            color: #454545;
            margin: 0px auto 15px auto;
            font-size: 14px;
        }
    }

    .tenant-list {
        list-style-type: none;
        padding-inline-start: 0%;
        padding-inline-end: 0%;
        margin-block-start: 0%;
        margin-block-end: 0%;
        height: 230px;
        overflow-y: scroll;

        .item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: #f0f5ff;
            // background: #fff;
            border-radius: 5px;
            color: #454545;
            padding: 15px;
            font-size: 14px;
            margin-bottom: 10px;

            .default-button {
                float: right;
                font-size: 12px;
                color: #889aa4;
                line-height: 17px;
            }
        }
    }

    .footer {
        margin-top: 10px;
        .footer-button {
            float: right;
        }
    }
}
</style>