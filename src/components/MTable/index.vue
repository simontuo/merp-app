<template>
    <el-table
        ref="mTable"
        v-loading="search.loading"
        :data="search.items"
        element-loading-text="Loading"
        fit
        highlight-current-row
        header-cell-class-name="table-header"
        :size="setting.size"
        @selection-change="handleSelect"
    >
        <slot name="columns"></slot>
    </el-table>
</template>

<script>
export default {
    computed: {
        setting() {
            return this.$store.state.app.table;
        },
        search() {
            return this.$store.state.search;
        }
    },
    mounted() {
        bus.$on("clearSelectedStatus", () => {
            this.$refs.mTable.clearSelection();
        });
    },
    methods: {
        handleSelect(rows) {
            bus.$emit("selectionChange", {
                rows: rows
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>