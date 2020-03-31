<template>
    <div class="department">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
            class="tree"
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
        >
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <!-- <el-button type="text" size="mini" @click="() => remove(node, data)"></el-button> -->
                    <el-dropdown class="operate-dropdown" trigger="click" @command="handleCommand">
                        <el-button type="text" class="operate-button">
                            <svg-icon icon-class="more" />
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="medium">新增</el-dropdown-item>
                            <el-dropdown-item command="small">编辑</el-dropdown-item>
                            <el-dropdown-item command="mini">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },

    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleCommand() {}
    },

    data() {
        const data = [
            {
                id: 1,
                label: "一级 1",
                children: [
                    {
                        id: 4,
                        label: "二级 1-1",
                        children: [
                            {
                                id: 9,
                                label: "三级 1-1-1"
                            },
                            {
                                id: 10,
                                label: "三级 1-1-2"
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                label: "一级 2",
                children: [
                    {
                        id: 5,
                        label: "二级 2-1"
                    },
                    {
                        id: 6,
                        label: "二级 2-2"
                    }
                ]
            },
            {
                id: 3,
                label: "一级 3",
                children: [
                    {
                        id: 7,
                        label: "二级 3-1"
                    },
                    {
                        id: 8,
                        label: "二级 3-2"
                    }
                ]
            }
        ];
        return {
            filterText: "",
            data: JSON.parse(JSON.stringify(data)),
            data: JSON.parse(JSON.stringify(data))
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