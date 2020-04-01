<template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="search.total"
        background
        class="pagination"
    ></el-pagination>
</template>

<script>
export default {
    name: "pagination",
    computed: {
        pagination() {
            return this.$store.state.pagination;
        },
        search() {
            return this.$store.state.search;
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$store.dispatch("pagination/changePageSize", { val });
            bus.$emit("search", {
                page: this.$store.state.pagination.page,
                pageSize: val
            });
        },
        handleCurrentChange(val) {
            bus.$emit("search", {
                page: val,
                pageSize: this.$store.state.pagination.pageSize
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.pagination {
    margin: 20px 20px 10px 20px;
}
</style>