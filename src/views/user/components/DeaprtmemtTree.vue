<template>
    <div class="department">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
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
                <span>{{ node.label }}</span>
                <span>
                    <el-dropdown class="operate-dropdown" trigger="click" @command="handleCommand">
                        <el-button type="text" class="operate-button">
                            <svg-icon icon-class="more" />
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="create">新增</el-dropdown-item>
                            <el-dropdown-item :command="'edit-' + node.id">编辑</el-dropdown-item>
                            <el-dropdown-item :command="'delete-' + node.id">删除</el-dropdown-item>
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
import { departmentList, departmentDelete } from "@/api/department";
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
            filterText: ""
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
            departmentList().then(response => {
                this.list = response.data.items;
            });
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
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
                case "delete":
                    this.delete(commandArr[1]);
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
        delete(id) {
            let that = this;
            this.$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    departmentDelete({ id: id }).then(response => {
                        that.$message.success(response.message);
                        that.fetchData();
                    });
                })
                .catch(() => {
                    this.$message.info("已取消删除");
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
</style>