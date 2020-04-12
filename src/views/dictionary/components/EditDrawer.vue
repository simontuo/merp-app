<template>
    <m-drawer ref="drawer">
        <template slot="content">
            <m-drawer-body v-loading="loading">
                <div slot="body" class="body">
                    <el-form ref="form" :model="form" label-width="60px" size="small">
                        <el-form-item label="名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="助记码">
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

export default {
    props: {
        profileFunction: {
            type: Function,
            default: null
        },
        updateFunction: {
            type: Function,
            default: null
        }
    },
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
            }
        };
    },
    methods: {
        show(title) {
            this.$refs.drawer.title = title;
            this.$refs.drawer.show();
            this.profileFunction({ id: this.id })
                .then(response => {
                    this.form = response.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        submit() {
            this.loading = true;
            this.updateFunction(this.form)
                .then(response => {
                    this.$message.success(response.message);
                })
                .catch(error => {
                    this.$message.success(error.message);
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