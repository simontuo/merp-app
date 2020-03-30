<template>
    <el-table
        v-loading="search.loading"
        :data="search.items"
        element-loading-text="Loading"
        fit
        highlight-current-row
        header-cell-class-name="table-header"
        :size="setting.size"
        @select="handleSelect"
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
    methods: {
        handleSelect(row) {
            console.log(row);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>