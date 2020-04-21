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
        storeFunction: {
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
            form: {
                name: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "名称不能为空"
                    }
                ]
            }
        };
    },
    methods: {
        show(title) {
            this.$refs.drawer.title = title;
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
            this.storeFunction(this.form)
                .then(response => {
                    this.$message.success(response.message);
                    this.$refs.drawer.close();
                    bus.$emit("search");
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