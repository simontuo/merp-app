<template>
    <div class="components-container">
        <m-drawer-body>
            <div class="editor-container" slot="body">
                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />
                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />

                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />

                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />

                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />

                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />

                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />
                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />

                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />
                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />

                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />
                <dnd-list :list1="list1" :list2="list2" list1-title="已选择" list2-title="没选择" />
            </div>
        </m-drawer-body>

        <m-drawer-footer>
            <template slot="operate-button">
                <el-button size="small">操作按钮</el-button>
                <el-button size="small" type="primary">操作按钮</el-button>
            </template>
        </m-drawer-footer>
    </div>
</template>

<script>
import DndList from "@/components/DndList";
import { fetchList } from "@/api/article";
import MDrawerFooter from "@/components/MDrawer/components/MDrawerFooter";
import MDrawerBody from "@/components/MDrawer/components/MDrawerBody";

export default {
    name: "DndListDemo",
    components: { DndList, MDrawerFooter, MDrawerBody },
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
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

