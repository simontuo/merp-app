<template>
    <div>
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
                <table-operate-bar :title="title">
                    <template slot="functionButton">
                        <el-button size="small" @click="create">新增</el-button>
                        <el-button size="small" type="danger" @click="deleteRow">删除</el-button>
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
                                    @click="showProfile('货物名称详情', scope.row.id)"
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
import TableSelectedBar from "@/components/TableSelectedBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import {
    goodsPageList,
    goodsProfile,
    goodsStore,
    goodsUpdate,
    goodsBatchDelete
} from "@/api/dictionary";
import CreateDrawer from "./CreateDrawer";
import EditDrawer from "./EditDrawer";

export default {
    components: {
        Pagination,
        TableOperateBar,
        TableSelectedBar,
        MTable,
        SearchForm,
        MCard,
        CreateDrawer,
        EditDrawer
    },
    data() {
        return {
            title: "货物名称数据",
            query: {
                name: ""
            }
        };
    },
    computed: {
        searchFunction() {
            return goodsPageList;
        },
        profileFunction() {
            return goodsProfile;
        },
        storeFunction() {
            return goodsStore;
        },
        updateFunction() {
            return goodsUpdate;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
        }
    },
    methods: {
        create() {
            this.$refs.createDrawer.show("货物名称新增");
        },
        showProfile(title, id) {
            this.$refs.editDrawer.id = id;
            this.$refs.editDrawer.show(title);
        },
        deleteRow() {
            if (this.selectedIds.length < 1) {
                this.$message({
                    message: "请选择需要删除的数据",
                    type: "warning"
                });
                return false;
            }
            goodsBatchDelete(this.selectedIds).then(response => {
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