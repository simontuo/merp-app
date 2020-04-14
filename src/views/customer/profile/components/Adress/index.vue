<template>
    <div>
        <search-form slot="body" :searchFunction="searchFunction" :query="query">
            <template slot="queryItem">
                <el-form-item label="地址名称">
                    <el-input v-model="query.name" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="query.contact" placeholder="联系人"></el-input>
                </el-form-item>
            </template>
            <template slot="hiddenQueryItem">
                <el-form-item label="联系电话">
                    <el-input v-model="query.contact_phone" placeholder="联系电话"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="query.contact_adress" placeholder="联系地址"></el-input>
                </el-form-item>
            </template>
        </search-form>
        <table-operate-bar title="地址数据" :defaultOperateButton="false" style="margin: 0;">
            <template slot="functionButton">
                <el-button size="small" @click="create">新增</el-button>
                <el-button size="small" type="danger" @click="deleteRow">删除</el-button>
            </template>
        </table-operate-bar>
        <m-table class="mt-1" ref="table">
            <template slot="columns">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" label="ID" width="55">
                    <template slot-scope="scope">{{ scope.$index }}</template>
                </el-table-column>
                <el-table-column label="地址名称" width="200" align="center">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="联系人" width="200" align="center">
                    <template slot-scope="scope">{{ scope.row.contact }}</template>
                </el-table-column>
                <el-table-column label="联系电话" align="center" width="200">
                    <template slot-scope="scope">{{ scope.row.contact_phone }}</template>
                </el-table-column>
                <el-table-column label="联系地址" align="center" width="400">
                    <template slot-scope="scope">{{ scope.row.contact_address }}</template>
                </el-table-column>
                <el-table-column label="创建人" width="110" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.creator }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row.id)">查看</el-button>
                    </template>
                </el-table-column>
            </template>
        </m-table>
        <pagination />
        <create-drawer ref="createDrawer"></create-drawer>
        <edit-drawer ref="editDrawer"></edit-drawer>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import { addressPageList, addressBatchDelete } from "@/api/address";
import CreateDrawer from "./components/CreateDrawer";
import EditDrawer from "./components/EditDrawer";

export default {
    name: "customerAddress",
    components: {
        MTable,
        TableOperateBar,
        TableSelectedBar,
        SearchForm,
        Pagination,
        CreateDrawer,
        EditDrawer
    },
    data() {
        return {
            query: {
                name: "",
                contact: "",
                contact_phone: "",
                contact_address: ""
            }
        };
    },
    computed: {
        searchFunction() {
            return addressPageList;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
        }
    },
    methods: {
        create() {
            this.$refs.createDrawer.show("地址新增");
        },
        edit(id) {
            this.$refs.editDrawer.id = id;
            this.$refs.editDrawer.show("地址详情");
        },
        deleteRow() {
            if (this.selectedIds.length < 1) {
                this.$message({
                    message: "请选择需要删除的数据",
                    type: "warning"
                });
                return false;
            }
            addressBatchDelete(this.selectedIds).then(response => {
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
