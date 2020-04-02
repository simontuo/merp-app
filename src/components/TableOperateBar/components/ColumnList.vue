<template>
    <div class="components-container">
        <m-drawer-body>
            <div class="editor-container" slot="body">
                <div class="dndList">
                    <el-row :gutter="5">
                        <el-col :span="12">
                            <draggable
                                :set-data="setData"
                                :list="list1"
                                group="article"
                                class="dragArea"
                            >
                                <div
                                    v-for="element in list1"
                                    :key="element.id"
                                    class="list-complete-item"
                                >
                                    <div class="list-complete-item-handle">{{ element.author }}</div>
                                    <div style="position:absolute;right:0px;">
                                        <span
                                            style="float: right ;margin-top: -20px;margin-right:5px;"
                                            @click="deleteEle(element)"
                                        >
                                            <i style="color:#ff4949" class="el-icon-delete" />
                                        </span>
                                    </div>
                                </div>
                            </draggable>
                        </el-col>
                        <el-col :span="12">
                            <draggable :list="list2" group="article" class="dragArea">
                                <div
                                    v-for="element in list2"
                                    :key="element.id"
                                    class="list-complete-item2"
                                >
                                    <div
                                        class="list-complete-item-handle2"
                                        @click="pushEle(element)"
                                    >{{ element.author }}</div>
                                </div>
                            </draggable>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </m-drawer-body>

        <m-drawer-footer>
            <template slot="operate-button">
                <el-button size="small">重置</el-button>
                <el-button size="small" type="primary">保存</el-button>
            </template>
        </m-drawer-footer>
    </div>
</template>

<script>
import { fetchList } from "@/api/article";
import MDrawerFooter from "@/components/MDrawer/components/MDrawerFooter";
import MDrawerBody from "@/components/MDrawer/components/MDrawerBody";
import draggable from "vuedraggable";

export default {
    name: "ColumnList",
    components: { MDrawerFooter, MDrawerBody, draggable },
    data() {
        return {
            list1: [],
            list2: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.listLoading = true;
            fetchList().then(response => {
                this.list1 = response.data.items.splice(0, 5);
                this.list2 = response.data.items;
            });
        },
        isNotInList1(v) {
            return this.list1.every(k => v.id !== k.id);
        },
        isNotInList2(v) {
            return this.list2.every(k => v.id !== k.id);
        },
        deleteEle(ele) {
            for (const item of this.list1) {
                if (item.id === ele.id) {
                    const index = this.list1.indexOf(item);
                    this.list1.splice(index, 1);
                    break;
                }
            }
            if (this.isNotInList2(ele)) {
                this.list2.unshift(ele);
            }
        },
        pushEle(ele) {
            for (const item of this.list2) {
                if (item.id === ele.id) {
                    const index = this.list2.indexOf(item);
                    this.list2.splice(index, 1);
                    break;
                }
            }
            if (this.isNotInList1(ele)) {
                this.list1.push(ele);
            }
        },
        setData(dataTransfer) {
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
            dataTransfer.setData("Text", "");
        }
    }
};
</script>

<style lang="scss" scoped>
.dndList {
    background: #fff;
    padding-bottom: 40px;
    &:after {
        content: "";
        display: table;
        clear: both;
    }
    .dragArea {
        margin-top: 15px;
        min-height: 50px;
        padding-bottom: 30px;
    }
}

.list-complete-item {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    color: #909399;
    padding: 12px;
    margin-top: 5px;
    transition: all 1s;
    background-color: #f2f6fc;
    border-radius: 4px;
    margin-right: 10px;
}

.list-complete-item2 {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    color: #909399;
    padding: 12px;
    margin-top: 5px;
    transition: all 1s;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-left: 10px;
}

.list-complete-item-handle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 50px;
    .swich {
        margin-right: 10px;
    }
}

.list-complete-item-handle2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 20px;
}

.list-complete-item.sortable-chosen {
    background: rgb(244, 244, 245);
}

.list-complete-item.sortable-ghost {
    background: rgb(233, 233, 235);
}

.list-complete-item2.sortable-chosen {
    background: rgb(244, 244, 245);
}

.list-complete-item2.sortable-ghost {
    background: rgb(233, 233, 235);
}

.list-complete-enter,
.list-complete-leave-active {
    opacity: 0;
}
</style>

