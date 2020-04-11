<template>
    <div class="app-container">
        <m-card>
            <template slot="body">
                <el-page-header @back="goBack" content="角色详情"></el-page-header>
            </template>
        </m-card>
        <el-row :gutter="20" class="mt-1">
            <el-col :span="12">
                <m-card>
                    <template slot="body">
                        <el-form
                            ref="form"
                            :model="form"
                            label-width="80px"
                            size="small"
                            v-loading="roleLoading"
                        >
                            <el-form-item label="名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="显示名称">
                                <el-input v-model="form.label"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="form.desc"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                </m-card>
            </el-col>
            <el-col :span="12">
                <m-card>
                    <template slot="body">
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

                        <el-tree
                            v-loading="treeLoading"
                            class="mt-1"
                            show-checkbox
                            default-expand-all
                            ref="tree"
                            node-key="id"
                            :data="permissions"
                            :default-checked-keys="form.permissionIds"
                            :props="defaultProps"
                            :filter-node-method="filterNode"
                        ></el-tree>
                    </template>
                </m-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MCard from "@/components/MCard";
import { fetchList } from "@/api/permission";
import { roleProfile, roleUpdate } from "@/api/role";

export default {
    components: {
        MCard
    },
    data() {
        return {
            roleLoading: false,
            form: {
                name: "",
                label: "",
                desc: "",
                permissionIds: []
            },
            treeLoading: false,
            filterText: "",
            permissions: [],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    mounted() {
        this.fetchRole();
        this.fetchPermissions();
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        goBack() {
            this.$router.push({ name: "role" });
        },
        onSubmit() {
            roleUpdate(this.form)
                .then(response => {
                    this.$message.success(response.message);
                })
                .catch(response => {
                    this.$message.error(response.message);
                });
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        fetchRole() {
            this.roleLoading = true;
            roleProfile({ id: this.$route.query.id })
                .then(response => {
                    this.form = response.data;
                })
                .finally(() => {
                    this.roleLoading = false;
                });
        },
        fetchPermissions() {
            this.treeLoading = true;
            fetchList()
                .then(response => {
                    this.permissions = response.data.items;
                })
                .finally(() => {
                    this.treeLoading = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>