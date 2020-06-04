<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction" labelWidthHidden="100px">
                <template slot="queryItem">
                    <el-form-item label="名称">
                        <select-remote :remoteFunction="remoteFunction" ref="name"></select-remote>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <date ref="createdAt"></date>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <s-input ref="contact" placeholder="联系人"></s-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <s-input ref="contactPhone" placeholder="联系电话"></s-input>
                    </el-form-item>
                    <el-form-item label="联系地址">
                        <s-input ref="contactAddress" placeholder="联系地址"></s-input>
                    </el-form-item>
                </template>
                <template slot="hiddenQueryItem">
                    <el-form-item label="创建人">
                        <select-remote :remoteFunction="remoteFunction" ref="creatorId"></select-remote>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="客户数据">
                    <template slot="functionButton">
                        <router-link
                            :to="{name: 'customerCreate'}"
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
                            <template slot-scope="scope">{{ scope.row.contact }}</template>
                        </el-table-column>
                        <el-table-column label="联系电话" align="center" width="200">
                            <template slot-scope="scope">{{ scope.row.contact_phone }}</template>
                        </el-table-column>
                        <el-table-column label="联系地址" align="center" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.contact_address }}</template>
                        </el-table-column>
                        <el-table-column label="创建人" width="110" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.creator }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="created_at" label="创建时间" width="200">
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.created_at }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <router-link
                                    :to="{path: '/customer/profile', query: {id:scope.row.id}}"
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
import {
    customerPageList,
    customerBatchBan,
    customerRemote
} from "@/api/customer";
import checkPermission from "@/utils/permission";
import { SelectRemote, Date, SInput } from "@/components/SearchItem";

export default {
    components: {
        Pagination,
        TableOperateBar,
        MTable,
        SearchForm,
        MCard,
        SelectRemote,
        Date,
        SInput
    },
    data() {
        return {};
    },
    computed: {
        searchFunction() {
            return customerPageList;
        },
        remoteFunction() {
            return customerRemote;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
        }
    },
    methods: {
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

            customerBatchBan({
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
        },
        checkPermission
    }
};
</script>

<style lang="scss" scoped>
</style>

