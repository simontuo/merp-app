<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
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