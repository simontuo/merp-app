<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction">
                <template slot="queryItem">
                    <el-form-item label="名称">
                        <s-input ref="name" placeholder="名称"></s-input>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="服务商数据">
                    <template slot="functionButton">
                        <router-link
                            :to="{name: 'supplierCreate'}"
                            v-if="checkPermission(['admin'])"
                        >
                            <el-button size="small">新增</el-button>
                        </router-link>
                        <el-dropdown class="ml-1" @command="banOrEnable">
                            <el-button size="small">
                                禁用/启用
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-close" command="ban">禁用</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-check" command="enable">启用</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </table-operate-bar>
                <m-table class="mt-1" ref="table">
                    <template slot="columns">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>
                        <el-table-column align="center" label="ID" width="55">
                            <template slot-scope="scope">{{ scope.$index }}</template>
                        </el-table-column>
                        <el-table-column label="名称" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="联系人" width="200" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.contact }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="联系电话" width="200" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.contact_phone }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="联系地址" align="center" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.contact_address }}</template>
                        </el-table-column>
                        <el-table-column label="类型" align="center">
                            <template slot-scope="scope">{{ scope.row.type }}</template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="created_at"
                            label="Display_time"
                            width="200"
                        >
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.created_at }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <router-link
                                    :to="{path: '/supplier/profile', query: {id:scope.row.id}}"
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
import { supplierPageList, supplierBatchBan } from "@/api/supplier";
import { SInput } from "@/components/SearchItem";
import checkPermission from "@/utils/permission";

export default {
    components: {
        Pagination,
        TableOperateBar,
        MTable,
        SearchForm,
        MCard,
        SInput
    },
    data() {
        return {};
    },
    computed: {
        searchFunction() {
            return supplierPageList;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
        }
    },
    methods: {
        checkPermission,
        banOrEnable(type) {
            if (this.selectedIds.length < 1) {
                this.$message({
                    message:
                        type === "ban"
                            ? "请选择需要禁用的数据"
                            : "请选择需要启用的数据",
                    type: "warning"
                });
                return false;
            }
            type === "ban"
                ? (this.banLoading = true)
                : (this.enableLoading = true);

            supplierBatchBan({
                ids: JSON.stringify(this.selectedIds),
                type: type
            })
                .then(response => {
                    this.$message({
                        message: response.message,
                        type: "success"
                    });
                    bus.$emit("search");
                })
                .finally(() => {
                    type === "ban"
                        ? (this.banLoading = false)
                        : (this.enableLoading = false);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

