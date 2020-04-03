<template>
    <div>
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction">
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
                    </template>
                </m-table>
                <pagination />
            </div>
        </m-card>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import { fetchList } from "@/api/cost-item";

export default {
    components: {
        Pagination,
        TableOperateBar,
        TableSelectedBar,
        MTable,
        SearchForm,
        MCard
    },
    data() {
        return {
            title: "费用项目数据",
            query: {
                name: ""
            }
        };
    },
    computed: {
        searchFunction() {
            return fetchList;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>