<template>
    <el-row>
        <el-row>
            <el-form-item label="仓库名称" class="form-item">
                <el-input v-model="form.warehouseName" class="form-item-width"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="入仓起始时间" class="form-item">
                <el-date-picker
                    v-model="form.enterWarehouseAt"
                    type="datetime"
                    placeholder="选择日期时间"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="仓库免堆期" class="form-item">
                <el-date-picker v-model="form.fressWarehouseDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="CFS作业" required>
                <el-radio-group v-model="form.isCFS" size="small">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="CFS装箱起始时间" class="form-item">
                <el-date-picker
                    v-model="form.cfsLoadingContainerStartAt"
                    type="datetime"
                    placeholder="选择日期时间"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="CFS拆箱完成时间" class="form-item">
                <el-date-picker
                    v-model="form.cfsLoadingContainerCompleteAt"
                    type="datetime"
                    placeholder="选择日期时间"
                ></el-date-picker>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="CFS拆箱异常情况" style="width: 710px;">
                <el-input
                    type="textarea"
                    v-model="form.sfcSolitContainerAbnormalSituation"
                    style="width: 580px;"
                ></el-input>
            </el-form-item>
        </el-row>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            form: {}
        };
    }
};
</script>

<style lang="scss" scoped>
</style>