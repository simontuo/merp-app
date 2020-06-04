<template>
    <el-row>
        <el-row>
            <el-form-item label="货物到港日期" class="form-item">
                <el-date-picker v-model="form.goodsArriveDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="免箱期" class="form-item">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="非集装箱货物不需录入，散货及空运货物只需录入免堆期。"
                    placement="right"
                >
                    <el-date-picker v-model="form.freeContainerDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="滞柜期限" class="form-item">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="系统根据货物到港日期及免箱期自动逻辑计算最终还箱期限时间。"
                    placement="right"
                >
                    <el-date-picker
                        v-model="form.strandedContainerLimitDate"
                        type="date"
                        placeholder="选择日期"
                    ></el-date-picker>
                </el-tooltip>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="免堆期" class="form-item">
                <el-date-picker v-model="form.freePileDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="滞堆期限" class="form-item">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="系统根据货物到港日期及免箱期自动逻辑计算最终还箱期限时间。"
                    placement="right"
                >
                    <el-date-picker v-model="form.strandedPileDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-tooltip>
            </el-form-item>
        </el-row>
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
            <el-form-item label="CFS拆箱起始时间" class="form-item">
                <el-date-picker
                    v-model="form.cfsSplitContainerStartAt"
                    type="datetime"
                    placeholder="选择日期时间"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="CFS拆箱完成时间" class="form-item">
                <el-date-picker
                    v-model="form.cfsSplitContainerCompleteAt"
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