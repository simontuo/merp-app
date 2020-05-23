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
                        <el-form-item label="部门" required prop="departmentIds">
                            <el-select
                                v-model="form.departmentIds"
                                multiple
                                placeholder="请选择"
                                class="drawer-form-item-width"
                            >
                                <el-option
                                    v-for="item in departments"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="密码" prop="loginPwd">
                            <el-input v-model="form.loginPwd" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirmPassword">
                            <el-input v-model="form.confirmPassword" show-password></el-input>
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
import { userStore } from "@/api/user";
import { phone, email } from "@/utils/validate";
import { departmentList } from "@/api/department";

export default {
    components: {
        MDrawer,
        MDrawerFooter,
        MDrawerBody
    },
    data() {
        return {
            loading: false,
            departments: [],
            form: {
                userName: "",
                phone: "",
                email: "",
                departmentIds: [],
                loginPwd: "",
                confirmPassword: ""
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
                ],
                departmentIds: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "部门不能为空"
                    }
                ],
                loginPwd: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "密码不能为空"
                    }
                ],
                confirmPassword: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "确认密码不能为空"
                    }
                ]
            }
        };
    },
    methods: {
        show(title) {
            this.$refs.drawer.title = title;
            departmentList().then(response => {
                this.departments = response.data.items;
            });
            this.$refs.drawer.show();
        },
        submit() {
            this.$refs.form.validate(valid => {
                if (!valid) {
                    return false;
                }
                this.store();
            });
        },
        store() {
            this.loading = true;
            this.form.departmentIds = JSON.stringify(this.form.departmentIds);
            userStore(this.form)
                .then(response => {
                    this.$message.success(response.message);
                    this.$refs.drawer.close();
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