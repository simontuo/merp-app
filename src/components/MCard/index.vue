<template>
    <div :class="'card-' + type">
        <el-card shadow="never">
            <slot name="body"></slot>
        </el-card>
    </div>
</template>

<script>
export default {
    props: ["type"]
};
</script>

<style lang="scss" scoped>
.card-search {
    .el-card >>> .el-card__body {
        padding: 20px 20px 0 20px;
    }
}
.card-table {
    .el-card >>> .el-card__body {
        padding: 10px 0;
    }
}
.card-profile {
    .el-card >>> .el-card__body {
        padding: 10px 20px;
    }
}

.card-cost {
    .el-card >>> .el-card__body {
        padding: 0;
    }
}
</style>