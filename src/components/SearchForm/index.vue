<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <slot name="queryItem"></slot>
        <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
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
            formInline: {
                user: "",
                region: ""
            }
        };
    },
    created() {
        this.search();
    },
    methods: {
        search() {
            this.$store.dispatch("search/loadingOn");
            this.searchFunction()
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