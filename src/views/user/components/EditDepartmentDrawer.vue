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
                        <el-form-item label="名称" required prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="助记码" required prop="mnemonic_code">
                            <el-input v-model="form.mnemonic_code"></el-input>
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
import { departmentUpdate, departmentProfile } from "@/api/department";

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
                name: "",
                mnemonic_code: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "名称不能为空"
                    }
                ],
                mnemonic_code: {
                    required: true,
                    trigger: "blur",
                    message: "验证码不能为空"
                }
            }
        };
    },
    methods: {
        show(title) {
            this.$refs.drawer.title = title;
            this.$refs.drawer.show();
            this.loading = true;
            departmentProfile({ id: this.id })
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
            this.loading = true;
            departmentUpdate(this.form)
                .then(response => {
                    this.$message.success(response.message);
                    this.$refs.drawer.close();
                    bus.$emit("departmentTreeReload");
                })
                .catch(error => {
                    this.$message.error(error.message);
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