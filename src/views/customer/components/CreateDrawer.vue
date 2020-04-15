<template>
    <m-drawer ref="drawer">
        <template slot="content">
            <m-drawer-body v-loading="loading">
                <div class="mt-2" slot="body">
                    <el-form ref="form" :model="form" label-width="80px" size="small">
                        <el-form-item label="名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="助记码">
                            <el-input v-model="form.mnemonic_code"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人">
                            <el-input v-model="form.contact"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input v-model="form.contact_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="联系地址">
                            <el-input type="textarea" v-model="form.contact_address"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </m-drawer-body>
            <m-drawer-footer>
                <template slot="operate-button">
                    <el-button size="small">重置</el-button>
                    <el-button size="small" type="primary" @click="submit" :disabled="loading">保存</el-button>
                </template>
            </m-drawer-footer>
        </template>
    </m-drawer>
</template>

<script>
import MDrawer from "@/components/MDrawer";
import MDrawerFooter from "@/components/MDrawer/components/MDrawerFooter";
import MDrawerBody from "@/components/MDrawer/components/MDrawerBody";
import { customerStore } from "@/api/customer";

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
                mnemonic_code: "",
                contact: "",
                contact_phone: "",
                contact_address: ""
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
            customerStore(this.form)
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
</style>