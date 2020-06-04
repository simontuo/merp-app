<template>
    <div class="department">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
            v-loading="loading"
            ref="tree"
            class="tree"
            :data="list"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
        >
            <span class="custom-tree-node" slot-scope="{ node }">
                <span :class="node.disabled ? 'disabled' : ''">{{ node.label }}</span>
                <span>
                    <el-dropdown class="operate-dropdown" trigger="click" @command="handleCommand">
                        <el-button type="text" class="operate-button">
                            <svg-icon icon-class="more" />
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="create">新增</el-dropdown-item>
                            <el-dropdown-item :command="'edit-' + node.key">编辑</el-dropdown-item>
                            <el-dropdown-item :command="'ban-' + node.key">禁用</el-dropdown-item>
                            <el-dropdown-item :command="'enable-' + node.key">启用</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </span>
        </el-tree>
        <create-department-drawer ref="createDepartmentDrawer"></create-department-drawer>
        <edit-department-drawer ref="editDepartmentDrawer"></edit-department-drawer>
    </div>
</template>

<script>
import { departmentList, departmentBatchBan } from "@/api/department";
import CreateDepartmentDrawer from "./CreateDepartmentDrawer";
import EditDepartmentDrawer from "./EditDepartmentDrawer";

export default {
    components: {
        CreateDepartmentDrawer,
        EditDepartmentDrawer
    },
    data() {
        return {
            list: [],
            filterText: "",
            loading: false
        };
    },
    mounted() {
        bus.$on("departmentTreeReload", () => {
            this.fetchData();
        });
    },
    created() {
        this.fetchData();
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        fetchData() {
            this.list = [];
            this.loading = true;
            departmentList()
                .then(response => {
                    for (let index in response.data.items) {
                        let item = response.data.items[index];
                        this.list.push({
                            id: item.id,
                            label: item.name,
                            children: [],
                            disabled: item.status === 0 ? false : true
                        });
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        handleCommand(command) {
            let commandArr = command.split("-");
            switch (commandArr[0]) {
                case "create":
                    this.create();
                    break;
                case "edit":
                    this.edit(commandArr[1]);
                    break;
                case "ban":
                    this.banOrEnable(commandArr[1], "ban");
                    break;
                case "enable":
                    this.banOrEnable(commandArr[1], "enable");
                    break;
                default:
                    this.$message.error("不存在的操作");
                    break;
            }
        },
        create() {
            this.$refs.createDepartmentDrawer.show("部门新增");
        },
        edit(id) {
            this.$refs.editDepartmentDrawer.id = id;
            this.$refs.editDepartmentDrawer.show("部门编辑");
        },
        banOrEnable(id, type) {
            let that = this;
            let action = type === "ban" ? "禁用" : "启用";
            this.$confirm(
                "此操作将永久" + action + "该部门, 是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            )
                .then(() => {
                    departmentBatchBan({
                        ids: "[" + id + "]",
                        type: type
                    }).then(response => {
                        that.$message.success(response.message);
                        that.fetchData();
                    });
                })
                .catch(() => {
                    this.$message.info("已取消" + action);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.department {
    margin: 0 20px;
    .tree {
        margin-top: 10px;
    }
    .operate-dropdown {
        line-height: 1px;
        .operate-button {
            font-size: 18px;
            color: #929292;
        }
    }
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    // padding-right: 8px;
}

.el-tree >>> .el-tree-node__content {
    height: 35px;
}

.disabled {
    color: #909399;
}
</style>