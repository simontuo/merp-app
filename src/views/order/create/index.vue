<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="16">
                <m-card type="profile">
                    <template slot="body">
                        <card-header title="订单详情">
                            <template slot="functionButton">
                                <el-button size="small" type="primary">新增</el-button>
                            </template>
                        </card-header>
                    </template>
                </m-card>
            </el-col>
            <el-col :span="8">
                <m-card></m-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MCard from "@/components/MCard";
import CardHeader from "@/components/MCard/components/Header";

export default {
    components: {
        MCard,
        CardHeader
    }
};
</script>

<style lang="scss" scoped>
</style>