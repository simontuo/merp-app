<template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
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
    data() {
        return {
            currentPage: 1
        };
    },
    computed: {
        pagination() {
            return this.$store.state.settings.pagination;
        },
        search() {
            return this.$store.state.search;
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
};
</script>

<style lang="scss" scoped>
.pagination {
    margin: 20px 20px 10px 20px;
}
</style>