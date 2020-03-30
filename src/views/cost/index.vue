<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction" />
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="推广数据" />
                <table-selected-bar selected="50" />
                <m-table class="mt-1">
                    <template slot="columns">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>
                        <el-table-column align="center" label="ID" width="55">
                            <template slot-scope="scope">{{ scope.$index }}</template>
                        </el-table-column>
                        <el-table-column label="Title">
                            <template slot-scope="scope">{{ scope.row.title }}</template>
                        </el-table-column>
                        <el-table-column label="Author" width="110" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.author }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="Pageviews" width="110" align="center">
                            <template slot-scope="scope">{{ scope.row.pageviews }}</template>
                        </el-table-column>
                        <el-table-column
                            class-name="status-col"
                            label="Status"
                            width="110"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <el-tag
                                    :type="scope.row.status | statusFilter"
                                >{{ scope.row.status }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="created_at"
                            label="Display_time"
                            width="200"
                        >
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.display_time }}</span>
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
import { getList } from "@/api/promote";

export default {
    components: {
        Pagination,
        TableOperateBar,
        TableSelectedBar,
        MTable,
        SearchForm,
        MCard
    },
    computed: {
        searchFunction() {
            return getList;
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

