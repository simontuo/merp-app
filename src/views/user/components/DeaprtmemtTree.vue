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
                            <el-dropdown-item command="edit">编辑</el-dropdown-item>
                            <el-dropdown-item command="delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </span>
        </el-tree>
        <create-department-drawer ref="createDepartmentDrawer"></create-department-drawer>
    </div>
</template>

<script>
import { departmentList } from "@/api/department";
import CreateDepartmentDrawer from "./CreateDepartmentDrawer";

export default {
    components: {
        CreateDepartmentDrawer
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
        handleCommand(id, command) {
            switch (command) {
                case "create":
                    this.create();
                    break;
                case "edit":
                    console.log(e);
                    this.edit();
                    break;
                case "delete":
                    this.delete();
                    break;
                default:
                    this.$message.error("不存在的操作");
                    break;
            }
        },
        create() {
            this.$refs.createDepartmentDrawer.show("部门新增");
        },
        edit() {},
        delete() {}
    },

    data() {
        return {
            list: [],
            filterText: "",
            list: []
        };
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