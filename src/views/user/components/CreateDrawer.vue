<template>
    <m-drawer ref="drawer">
        <template slot="content">
            <m-drawer-body v-loading="loading">
                <div slot="body" class="body">
                    <el-form
                        ref="form"
                        :model="form"
                        label-width="80px"
                        size="small"
                        label-position="left"
                    >
                        <el-form-item label="名称" required>
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机" required>
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
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
import { userStore } from "@/api/user";

export default {
    components: {
        MDrawer,
        MDrawerFooter,
        MDrawerBody
    },
    data() {
        return {
            loading: false,
            form: {
                name: "",
                phone: "",
                email: ""
            }
        };
    },
    methods: {
        show(title) {
            this.$refs.drawer.title = title;
            this.$refs.drawer.show();
        },
        submit() {
            this.loading = true;
            userStore(this.form)
                .then(response => {
                    this.$message.success(response.message);
                    this.$refs.drawer.close();
                    bus.$emit("search");
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