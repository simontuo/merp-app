<template>
    <el-card class="info" shadow="hover" :body-style="{ padding: '15px' }">
        <div class="title clearfix">
            <div class="marker"></div>到港信息
        </div>
        <div class="content">
            <div>6666</div>
        </div>
    </el-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-card {
    border: 0px;
}

.el-card >>> .el-card__body {
    background-color: #f2f6fc;
}

.info {
    margin-bottom: 10px;
    .title {
        .marker {
            width: 12px;
            height: 12px;
            border-radius: 12px;
            background-color: coral;
            float: left;
            margin-right: 10px;
            margin-top: 3px;
        }
    }

    .content {
        color: #909399;
        padding: 10px 0 0 20px;
        font-size: 14px;
    }
}
</style>