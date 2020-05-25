<template>
    <div>
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction">
                <template slot="queryItem">
                    <el-form-item label="名称">
                        <s-input ref="name" placeholder="名称"></s-input>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar :title="title">
                    <template slot="functionButton">
                        <el-button size="small" @click="create">新增</el-button>
                        <el-dropdown class="ml-1" @command="banOrEnable">
                            <el-button size="small" :loading="banLoading" :disabled="banLoading">
                                禁用/启用
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-close" command="ban">禁用</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-check" command="enable">启用</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </table-operate-bar>
                <m-table class="mt-1" ref="table">
                    <template slot="columns">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>
                        <el-table-column align="center" label="ID" width="55">
                            <template slot-scope="scope">{{ scope.$index }}</template>
                        </el-table-column>
                        <el-table-column label="名称" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="助记码" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.mnemonic_code }}</template>
                        </el-table-column>
                        <el-table-column align="center" prop="created_at" label="创建时间">
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.created_at }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="showProfile('费用项目详情', scope.row.id)"
                                >查看</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </m-table>
                <pagination />
            </div>
        </m-card>
        <create-drawer ref="createDrawer" :storeFunction="storeFunction"></create-drawer>
        <edit-drawer
            ref="editDrawer"
            :profileFunction="profileFunction"
            :updateFunction="updateFunction"
        ></edit-drawer>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import {
    cosItemPageList,
    costItemProfile,
    costItemStore,
    costItemUpdate,
    costItemsBtachBan
} from "@/api/dictionary";
import CreateDrawer from "./CreateDrawer";
import EditDrawer from "./EditDrawer";
import { SInput } from "@/components/SearchItem";

export default {
    components: {
        Pagination,
        TableOperateBar,
        MTable,
        SearchForm,
        MCard,
        CreateDrawer,
        EditDrawer,
        SInput
    },
    data() {
        return {
            title: "费用项目数据",
            banLoading: false
        };
    },
    computed: {
        searchFunction() {
            return cosItemPageList;
        },
        profileFunction() {
            return costItemProfile;
        },
        storeFunction() {
            return costItemStore;
        },
        updateFunction() {
            return costItemUpdate;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
        }
    },
    methods: {
        create() {
            this.$refs.createDrawer.show("费用项目新增");
        },
        showProfile(title, id) {
            this.$refs.editDrawer.id = id;
            this.$refs.editDrawer.show(title);
        },
        banOrEnable(type) {
            if (this.selectedIds.length < 1) {
                this.$message({
                    message:
                        type === "ban"
                            ? "请选择需要禁用的数据"
                            : "请选择需要启用的数据",
                    type: "warning"
                });
                return false;
            }
            this.banLoading = true;

            costItemsBtachBan({
                ids: JSON.stringify(this.selectedIds),
                type: type
            })
                .then(response => {
                    this.$message({
                        message: response.message,
                        type: "success"
                    });
                    bus.$emit("search");
                })
                .finally(() => {
                    this.banLoading = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>