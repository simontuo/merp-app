<template>
    <div class="app-container">
        <m-card>
            <template slot="body">
                <el-page-header @back="goBack" content="订单详情"></el-page-header>
            </template>
        </m-card>
    </div>
</template>

<script>
import MCard from "@/components/MCard";

export default {
    components: {
        MCard
    },
    methods: {
        goBack() {
            this.$router.push({
                name: "order"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>