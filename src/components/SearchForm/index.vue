<template>
    <el-form :inline="true" :model="query" class="demo-form-inline" size="small">
        <slot name="queryItem"></slot>
        <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        searchFunction: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            query: {}
        };
    },
    created() {
        this.search();
    },
    methods: {
        search(
            page = 1,
            pageSize = this.$store.state.settings.pagination.pageSize
        ) {
            this.$store.dispatch("search/loadingOn");
            this.searchFunction({
                page: page,
                pageSize: pageSize,
                query: this.query
            })
                .then(response => {
                    this.$store.dispatch("search/getData", { response });
                })
                .finally(() => {
                    this.$store.dispatch("search/loadingOff");
                });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>