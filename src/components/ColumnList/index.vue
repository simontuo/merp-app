<template>
    <div class="column-list">
        <div class="header">表头设置</div>
        <div class="list">
            <draggable :list="list" group="article" class="dragArea">
                <div v-for="element in list" :key="element.id" class="list-complete-item">
                    <div class="list-complete-item-handle">
                        <span class="icon">
                            <svg-icon icon-class="list" />
                        </span>
                        {{ element.author }}
                    </div>
                    <div style="position:absolute;right:0px;">
                        <span class="right-icon" @click="toggleCheck">
                            <i class="el-icon-check" />
                        </span>
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
import { fetchList } from "@/api/article";
import draggable from "vuedraggable";

export default {
    components: {
        draggable
    },
    data() {
        return {
            list: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.listLoading = true;
            fetchList().then(response => {
                // this.list = response.data.items.splice(0, 5);
                this.list = response.data.items;
            });
        },
        toggleCheck() {}
    }
};
</script>

<style lang="scss" scoped>
.column-list {
    width: 200px;
    .header {
        text-align: center;
        margin-bottom: 10px;
    }
    .list {
        // height: 300px;
        // overflow-y: scroll;

        .list-complete-item {
            cursor: pointer;
            position: relative;
            font-size: 14px;
            // color: #909399;
            padding: 14px;
            transition: all 1s;
            .icon {
                margin-right: 5px;
            }
            .right-icon {
                float: right;
                margin-top: -14px;
                margin-right: 10px;
                color: #ff4949;
            }
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

        .list-complete-item.sortable-chosen {
            background: rgb(244, 244, 245);
        }

        .list-complete-item.sortable-ghost {
            background: #f2f6fc;
        }

        .list-complete-enter,
        .list-complete-leave-active {
            opacity: 0;
        }
    }
}
</style>