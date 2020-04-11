<template>
    <div class="app-container">
        <m-card>
            <template slot="body">
                <el-page-header @back="goBack" content="角色新增"></el-page-header>
            </template>
        </m-card>
        <el-row :gutter="20" class="mt-1">
            <el-col :span="12">
                <m-card>
                    <template slot="body">
                        <el-form ref="form" :model="form" label-width="80px" size="small">
                            <el-form-item label="名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="显示名称">
                                <el-input v-model="form.display_name"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="form.desc"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
                            :data="permissions"
                            :props="defaultProps"
                            default-expand-all
                            :filter-node-method="filterNode"
                            ref="tree"
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
import { roleStore } from "@/api/role";

export default {
    components: {
        MCard
    },
    data() {
        return {
            form: {
                name: "",
                label: "",
                desc: ""
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
    created() {
        this.treeLoading = true;
        fetchList()
            .then(response => {
                this.permissions = response.data.items;
            })
            .finally(() => {
                this.treeLoading = false;
            });
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
            roleStore(this.form)
                .then(response => {
                    this.$message.success(response.message);
                    this.$router.push({ name: "role" });
                })
                .catch(response => {
                    this.$message.error(response.message);
                });
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>