<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction">
                <template slot="queryItem">
                    <el-form-item label="收付">
                        <s-select :options="types" ref="type"></s-select>
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
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import { fetchList } from "@/api/cost";
import { SSelect } from "@/components/SearchItem";

export default {
    components: {
        Pagination,
        TableOperateBar,
        MTable,
        SearchForm,
        MCard,
        SSelect
    },
    data() {
        return {
            types: [
                {
                    value: 0,
                    label: "应收"
                },
                {
                    value: 1,
                    label: "应付"
                }
            ]
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

