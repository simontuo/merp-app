<template>
    <m-drawer ref="drawer">
        <template slot="content">
            <m-drawer-body v-loading="loading">
                <div slot="body" class="body">
                    <el-form
                        ref="form"
                        :model="form"
                        :rules="rules"
                        label-width="80px"
                        size="small"
                        label-position="left"
                    >
                        <el-form-item label="名称" required prop="userName">
                            <el-input v-model="form.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="手机" required prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </m-drawer-body>
            <m-drawer-footer>
                <template slot="operate-button">
                    <el-button size="small">重置</el-button>
                    <el-button size="small" type="primary" @click="submit">保存</el-button>
                </template>
            </m-drawer-footer>
        </template>
    </m-drawer>
</template>

<script>
import MDrawer from "@/components/MDrawer";
import MDrawerFooter from "@/components/MDrawer/components/MDrawerFooter";
import MDrawerBody from "@/components/MDrawer/components/MDrawerBody";
import { userProfile, userUpdate } from "@/api/user";
import { phone, email } from "@/utils/validate";

export default {
    components: {
        MDrawer,
        MDrawerFooter,
        MDrawerBody
    },
    data() {
        return {
            loading: false,
            id: "",
            form: {
                id: "",
                userName: "",
                phone: "",
                email: ""
            },
            rules: {
                userName: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "名称不能为空"
                    }
                ],
                phone: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "手机号码不能为空"
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (!phone(value)) {
                                callback(new Error("请输入正确的手机号码"));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                email: [
                    {
                        validator: (rule, value, callback) => {
                            if (!email(value)) {
                                callback(new Error("请输入正确的邮箱"));
                            } else {
                                callback();
                            }
                        }
                    }
                ]
            }
        };
    },
    methods: {
        show(title) {
            this.$refs.drawer.title = title;
            this.$refs.drawer.show();
            this.loading = true;
            userProfile({ id: this.id })
                .then(response => {
                    this.form = response.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (!valid) {
                    return false;
                }
                this.update();
            });
        },
        update() {
            this.form.id = this.id;
            this.loading = true;
            userUpdate(this.form)
                .then(response => {
                    this.$message.success(response.message);
                    bus.$emit("search");
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.body {
    padding: 10px;
}
</style>