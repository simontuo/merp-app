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
                                <el-button size="small" type="primary" @click="create">新增</el-button>
                                <el-button size="small" type="warning" @click="ban">禁用</el-button>
                            </template>
                        </table-operate-bar>
                        <table-selected-bar selected="50" />
                        <m-table class="mt-1" ref="table">
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
                                <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="100"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-button
                                            type="text"
                                            size="small"
                                            @click="showProfile('用户详情', scope.row.id)"
                                        >查看</el-button>
                                    </template>
                                </el-table-column>
                            </template>
                        </m-table>
                        <pagination />
                    </div>
                </m-card>
            </el-col>
        </el-row>
        <create-drawer ref="createDrawer"></create-drawer>
        <edit-drawer ref="editDrawer"></edit-drawer>
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
import { userPageList, useuserBan, userBan } from "@/api/user";
import CreateDrawer from "./components/CreateDrawer";
import EditDrawer from "./components/EditDrawer";

export default {
    components: {
        Pagination,
        TableOperateBar,
        TableSelectedBar,
        MTable,
        SearchForm,
        MCard,
        DepartmemtTree,
        CreateDrawer,
        EditDrawer
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
            return userPageList;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
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
    },
    methods: {
        create() {
            this.$refs.createDrawer.show("用户新增");
        },
        showProfile(title, id) {
            this.$refs.editDrawer.id = id;
            this.$refs.editDrawer.show(title);
        },
        ban() {
            if (this.selectedIds.length < 1) {
                this.$message({
                    message: "请选择需要禁用的数据",
                    type: "warning"
                });
                return false;
            }
            userBan(this.selectedIds).then(response => {
                this.$message({
                    message: response.message,
                    type: "success"
                });
                bus.$emit("search");
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

