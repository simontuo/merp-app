<template>
    <div class="app-container">
        <m-card type="search">
            <search-form
                ref="searchForm"
                slot="body"
                :searchFunction="searchFunction"
                :query="query"
            >
                <template slot="queryItem">
                    <el-form-item label="名称">
                        <el-input v-model="query.name" placeholder="名称"></el-input>
                    </el-form-item>
                    <el-form-item label="显示名称">
                        <el-select v-model="query.label" placeholder="显示名称">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body" ref="tableData">
                <table-operate-bar title="角色数据">
                    <template slot="functionButton">
                        <router-link :to="{name: 'roleCreate'}">
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
                        <el-table-column label="名称" width="200">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="显示名称" width="200" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.display_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="created_at" label="创建于">
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.created_at }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <router-link :to="{name: 'roleProfile', query: {id:scope.row.id}}">
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
import { fetchList } from "@/api/role";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/SearchForm";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MCard from "@/components/MCard";
import MTable from "@/components/MTable";

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
                name: "",
                label: ""
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