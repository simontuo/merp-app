<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction">
                <template slot="queryItem">
                    <el-form-item label="订单号">
                        <s-input ref="no" placeholder="订单号"></s-input>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="订单数据">
                    <template slot="tableFunctionButton">
                        <el-dropdown class="selected-operate-dropdown" trigger="click">
                            <el-button type="text" class="operate-button">
                                <span class="right-icon">
                                    <svg-icon icon-class="batch" />
                                </span>
                                批量操作
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <batch-menu>
                                    <template slot="item">
                                        <batch-menu-item label="禁用" icon="ban" />
                                        <batch-menu-item label="启用" icon="check" />
                                        <batch-menu-item label="订单号" icon="edit" />
                                    </template>
                                </batch-menu>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                    <template slot="functionButton">
                        <router-link :to="{path: '/order/create'}">
                            <el-button size="small">新增</el-button>
                        </router-link>
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
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import { fetchList } from "@/api/order";
import { SInput } from "@/components/SearchItem";
import BatchMenu from "@/components/BatchMenu";
import BatchMenuItem from "@/components/BatchMenu/components/BatchMenuItem";

export default {
    components: {
        Pagination,
        TableOperateBar,
        MTable,
        SearchForm,
        MCard,
        SInput,
        BatchMenu,
        BatchMenuItem
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

