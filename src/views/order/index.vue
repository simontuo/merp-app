<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction" :query="query">
                <template slot="queryItem">
                    <el-form-item label="订单号">
                        <el-input v-model="query.no" placeholder="订单号"></el-input>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="订单数据">
                    <template slot="functionButton">
                        <router-link :to="{path: '/order/create'}">
                            <el-button size="small" type="primary">新增</el-button>
                        </router-link>
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
                        <el-table-column label="客户" width="200" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.customer_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="created_at" label="创建时间">
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.created_at }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <router-link
                                    :to="{path: '/order/profile', query: {id:scope.row.id}}"
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
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import { fetchList } from "@/api/order";

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
                no: ""
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

