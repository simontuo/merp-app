<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction" :query="query">
                <template slot="queryItem">
                    <el-form-item label="名称">
                        <el-input v-model="query.name" placeholder="名称"></el-input>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="服务商数据">
                    <template slot="functionButton">
                        <el-button size="small" @click="create">新增</el-button>
                        <el-button size="small" type="warning" @click="ban">禁用</el-button>
                    </template>
                </table-operate-bar>
                <table-selected-bar selected="50" />
                <m-table class="mt-1" ref="table">
                    <template slot="columns">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>
                        <el-table-column align="center" label="ID" width="55">
                            <template slot-scope="scope">{{ scope.$index }}</template>
                        </el-table-column>
                        <el-table-column label="名称" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="联系人" width="200" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.contact }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="联系电话" width="200" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.contact_phone }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="联系地址" align="center">
                            <template slot-scope="scope">{{ scope.row.contact_address }}</template>
                        </el-table-column>
                        <el-table-column label="类型" align="center">
                            <template slot-scope="scope">{{ scope.row.type }}</template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="created_at"
                            label="Display_time"
                            width="200"
                        >
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.created_at }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <router-link
                                    :to="{path: '/supplier/profile', query: {id:scope.row.id}}"
                                >
                                    <el-button type="text" size="small">查看</el-button>
                                </router-link>
                            </template>
                        </el-table-column>
                    </template>
                </m-table>
                <pagination />
            </div>
        </m-card>
        <create-drawer ref="createDrawer"></create-drawer>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import CreateDrawer from "./components/CreateDrawer";
import { supplierPageList, supplierBatchBan } from "@/api/supplier";

export default {
    components: {
        Pagination,
        TableOperateBar,
        TableSelectedBar,
        MTable,
        SearchForm,
        MCard,
        CreateDrawer
    },
    data() {
        return {
            query: {
                name: ""
            }
        };
    },
    computed: {
        searchFunction() {
            return supplierPageList;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
        }
    },
    methods: {
        create() {
            this.$refs.createDrawer.show("服务商新增");
        },
        ban() {
            if (this.selectedIds.length < 1) {
                this.$message({
                    message: "请选择需要禁用的数据",
                    type: "warning"
                });
                return false;
            }
            supplierBatchBan(this.selectedIds).then(response => {
                this.$message({
                    message: response.message,
                    type: "success"
                });
                bus.$emit("search");
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

