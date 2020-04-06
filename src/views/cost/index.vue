<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction" :query="query">
                <template slot="queryItem">
                    <el-form-item label="收付">
                        <el-select v-model="query.type" placeholder="收付">
                            <el-option label="应收" value="true"></el-option>
                            <el-option label="应付" value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="费用数据">
                    <template slot="functionButton">
                        <el-button size="small" type="primary">审核</el-button>
                    </template>
                </table-operate-bar>
                <table-selected-bar selected="50" />
                <m-table class="mt-1">
                    <template slot="columns">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>
                        <el-table-column align="center" label="ID" width="55">
                            <template slot-scope="scope">{{ scope.$index }}</template>
                        </el-table-column>
                        <el-table-column label="订单号" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.no }}</template>
                        </el-table-column>
                        <el-table-column label="收付" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.type ? '应收' : '应付' }}</template>
                        </el-table-column>
                        <el-table-column label="费用项目" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.cost_item_name }}</template>
                        </el-table-column>
                        <el-table-column label="数量" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.amount }}</template>
                        </el-table-column>
                        <el-table-column label="价格" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.total_amount }}</template>
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
import { fetchList } from "@/api/cost";

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
                type: ""
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

