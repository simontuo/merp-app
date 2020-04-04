<template>
    <div>
        <search-form slot="body" :searchFunction="searchFunction">
            <template slot="queryItem">
                <el-form-item label="联系人">
                    <el-input v-model="query.contacts" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="query.phone" placeholder="联系电话"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="query.adress" placeholder="联系地址"></el-input>
                </el-form-item>
            </template>
        </search-form>
        <table-operate-bar title="地址数据" :defaultOperateButton="false" style="margin: 0;">
            <template slot="functionButton">
                <el-button size="small" type="primary" @click="handelCreate('地址新增')">新增</el-button>
            </template>
        </table-operate-bar>
        <m-table class="mt-1">
            <template slot="columns">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" label="ID" width="55">
                    <template slot-scope="scope">{{ scope.$index }}</template>
                </el-table-column>
                <el-table-column label="联系人" width="200" align="center">
                    <template slot-scope="scope">{{ scope.row.contacts }}</template>
                </el-table-column>
                <el-table-column label="联系电话" align="center" width="200">
                    <template slot-scope="scope">{{ scope.row.phone }}</template>
                </el-table-column>
                <el-table-column label="联系地址" align="center">
                    <template slot-scope="scope">{{ scope.row.address }}</template>
                </el-table-column>
                <el-table-column label="创建人" width="110" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.creator }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handelEdit(scope.row.id)">编辑</el-button>

                        <el-button type="text" size="small" @click="handelDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </template>
        </m-table>
        <pagination />
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import { fetchList } from "@/api/customer";

export default {
    name: "customerAddress",
    components: {
        MTable,
        TableOperateBar,
        TableSelectedBar,
        SearchForm,
        Pagination
    },
    data() {
        return {
            query: {
                name: "",
                contacts: "",
                phone: ""
            }
        };
    },
    computed: {
        searchFunction() {
            return fetchList;
        }
    },
    methods: {
        handelEdit(id) {
            console.log(id);
        },
        handelDelete(id) {
            console.log(id);
        }
    }
};
</script>
