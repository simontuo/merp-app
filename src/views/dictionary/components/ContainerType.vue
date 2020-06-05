<template>
    <div>
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
                <table-operate-bar :title="title">
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
                                        <batch-menu-item
                                            label="禁用"
                                            icon="ban"
                                            @click.native="banOrEnable('ban')"
                                        />
                                        <batch-menu-item
                                            label="启用"
                                            icon="check"
                                            @click.native="banOrEnable('enable')"
                                        />
                                        <batch-menu-item label="订单号" icon="edit" />
                                    </template>
                                </batch-menu>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                    <template slot="functionButton">
                        <el-button size="small" @click="create">新增</el-button>
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
                        <el-table-column label="助记码" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.mnemonic_code }}</template>
                        </el-table-column>
                        <el-table-column align="center" prop="created_at" label="创建时间">
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.created_at }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="showProfile('货物名称详情', scope.row.id)"
                                >查看</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </m-table>
                <pagination />
            </div>
        </m-card>
        <create-drawer ref="createDrawer" :storeFunction="storeFunction"></create-drawer>
        <edit-drawer
            ref="editDrawer"
            :profileFunction="profileFunction"
            :updateFunction="updateFunction"
        ></edit-drawer>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import {
    containerTypePageList,
    containerTypeProfile,
    containerTypeStore,
    containerTypeUpdate,
    containerTypeBtachBan
} from "@/api/dictionary";
import CreateDrawer from "./CreateDrawer";
import EditDrawer from "./EditDrawer";
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
        CreateDrawer,
        EditDrawer,
        SInput,
        BatchMenu,
        BatchMenuItem
    },
    data() {
        return {
            title: "集装箱类型数据",
            banLoading: false
        };
    },
    computed: {
        searchFunction() {
            return containerTypePageList;
        },
        profileFunction() {
            return containerTypeProfile;
        },
        storeFunction() {
            return containerTypeStore;
        },
        updateFunction() {
            return containerTypeUpdate;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
        }
    },
    methods: {
        create() {
            this.$refs.createDrawer.show("货物名称新增");
        },
        showProfile(title, id) {
            this.$refs.editDrawer.id = id;
            this.$refs.editDrawer.show(title);
        },
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
            this.banLoading = true;

            containerTypeBtachBan({
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
                    this.banLoading = true;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>