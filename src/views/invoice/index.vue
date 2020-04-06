<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction" :query="query">
                <template slot="queryItem">
                    <el-form-item label="买方">
                        <el-input v-model="query.buyer" placeholder="买方"></el-input>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="发票数据">
                    <template slot="functionButton">
                        <el-button size="small" type="primary">开票</el-button>
                    </template>
                </table-operate-bar>
                <table-selected-bar selected="50" />
                <m-table class="mt-1">
                    <template slot="columns">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>
                        <el-table-column align="center" label="ID" width="55">
                            <template slot-scope="scope">{{ scope.$index }}</template>
                        </el-table-column>
                        <el-table-column label="卖方" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.seller }}</template>
                        </el-table-column>
                        <el-table-column label="买方" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.buyer }}</template>
                        </el-table-column>
                        <el-table-column label="开票金额" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.total_amount }}</template>
                        </el-table-column>
                        <el-table-column label="税率" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.rate }}</template>
                        </el-table-column>
                        <el-table-column label="税金" width="200" align="center">
                            <template
                                slot-scope="scope"
                            >{{ scope.row.total_amount * scope.row.rate / 100 }}</template>
                        </el-table-column>
                        <el-table-column align="center" prop="created_at" label="创建于">
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
import { fetchList } from "@/api/invoice";

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
            query: {
                buyer: ""
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

