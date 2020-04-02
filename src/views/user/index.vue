<template>
    <div class="app-container">
        <m-card type="search">
            <search-form ref="searchForm" slot="body" :searchFunction="searchFunction">
                <template slot="queryItem">
                    <el-form-item label="名称">
                        <el-input v-model="query.name" placeholder="名称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-select v-model="query.phone" placeholder="手机">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <m-card type="table" class="mt-2">
                    <departmemt-tree slot="body"></departmemt-tree>
                </m-card>
            </el-col>
            <el-col :span="18">
                <m-card type="table" class="mt-2">
                    <div slot="body">
                        <table-operate-bar title="用户数据">
                            <template slot="functionButton">
                                <el-button size="small" type="primary">新增</el-button>
                            </template>
                        </table-operate-bar>
                        <table-selected-bar selected="50" />
                        <m-table class="mt-1">
                            <template slot="columns">
                                <el-table-column align="center" type="selection" width="55"></el-table-column>
                                <el-table-column align="center" label="ID" width="55">
                                    <template slot-scope="scope">{{ scope.$index }}</template>
                                </el-table-column>
                                <el-table-column label="名称" width="110">
                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                </el-table-column>
                                <el-table-column label="手机" width="200" align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.phone }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="邮箱" align="center">
                                    <template slot-scope="scope">{{ scope.row.email }}</template>
                                </el-table-column>
                                <!-- <el-table-column
                                    class-name="status-col"
                                    label="状态"
                                    width="110"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.status | statusFilter"
                                        >{{ scope.row.status }}</el-tag>
                                    </template>
                                </el-table-column>-->
                                <el-table-column
                                    align="center"
                                    prop="created_at"
                                    label="创建于"
                                    width="200"
                                >
                                    <template slot-scope="scope">
                                        <i class="el-icon-time" />
                                        <span>{{ scope.row.created_at }}</span>
                                    </template>
                                </el-table-column>
                            </template>
                        </m-table>
                        <pagination />
                    </div>
                </m-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import DepartmemtTree from "./components/DeaprtmemtTree";
import { fetchList } from "@/api/user";

export default {
    components: {
        Pagination,
        TableOperateBar,
        TableSelectedBar,
        MTable,
        SearchForm,
        MCard,
        DepartmemtTree
    },
    data() {
        return {
            query: {
                name: "",
                phone: ""
            }
        };
    },
    computed: {
        searchFunction() {
            return fetchList;
        }
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: "success",
                draft: "gray",
                deleted: "danger"
            };
            return statusMap[status];
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

