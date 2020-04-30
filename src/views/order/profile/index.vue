<template>
    <div class="app-container">
        <sticky :sticky-top="0">
            <m-card type="profile">
                <template slot="body">
                    <el-row>
                        <el-col :span="18">
                            <el-page-header @back="goBack" content="订单详情"></el-page-header>
                        </el-col>
                        <el-col :span="6">
                            <div class="header-button">
                                <el-divider direction="vertical"></el-divider>
                                <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </template>
            </m-card>
        </sticky>
        <el-row :gutter="20" class="mt-1">
            <el-col :span="12">
                <m-card type="cost">
                    <template slot="body">
                        <el-alert title="订单信息基本情况" :closable="false" class="create-alert"></el-alert>
                        <el-form
                            class="create-form"
                            ref="form"
                            :model="form"
                            label-width="100px"
                            size="small"
                            label-position="left"
                            :inline="true"
                        >
                            <el-row>
                                <el-form-item label="收款人" required class="form-item">
                                    <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                </el-form-item>
                                <el-form-item label="结算人" required class="form-item">
                                    <el-input
                                        v-model="tenant.name"
                                        disabled
                                        class="form-item-width"
                                    ></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="应收费用" required class="form-item">
                                    <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                </el-form-item>
                                <el-form-item label="订单类型" required class="form-item">
                                    <el-radio-group v-model="form.type" size="small">
                                        <el-radio label="import">进口</el-radio>
                                        <el-radio label="export">出口</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="货类" required>
                                    <el-radio-group v-model="form.goodsType" size="small">
                                        <el-radio label="general">普货</el-radio>
                                        <el-radio label="frozen">冻柜</el-radio>
                                        <el-radio label="danger">危险品</el-radio>
                                        <el-radio label="bulk">散货</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-row>
                            <!-- 进口表单字段组件 -->
                            <import-form-item ref="importFormItem" v-if="form.type === 'import'"></import-form-item>
                            <!-- 出口表单字段组件 -->
                            <export-form-item ref="exportFormItem" v-else></export-form-item>
                            <el-row>
                                <el-form-item label="运输模式" required>
                                    <el-radio-group v-model="form.type" size="small">
                                        <el-radio label="0">陆路运输</el-radio>
                                        <el-radio label="1">海运运输</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="运输服务商" required>
                                    <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                </el-form-item>
                                <el-form-item label="费用" required>
                                    <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                </el-form-item>
                            </el-row>
                        </el-form>
                    </template>
                </m-card>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <!-- 货物信息组件 -->
                    <goods-info ref="goodsInfo"></goods-info>
                </el-row>
                <el-row class="mt-1">
                    <!-- 费用组件 -->
                    <cost-card ref="costCard" :costs="form.costs"></cost-card>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import MCard from "@/components/MCard";
import MTable from "@/components/MTable";
import CardHeader from "@/components/MCard/components/Header";
import Sticky from "@/components/Sticky";
import {
    ImportFormItem,
    ExportFormItem,
    GoodsInfo,
    CostCard
} from "../components";

export default {
    components: {
        MCard,
        CardHeader,
        MTable,
        Sticky,
        ImportFormItem,
        ExportFormItem,
        GoodsInfo,
        CostCard
    },
    data() {
        return {
            form: {
                type: "import",
                goodsType: "general",
                costs: [
                    {
                        object: "大力有限公司",
                        type: "应收",
                        costItem: "运费",
                        amount: 1,
                        totalAmount: 15000
                    },
                    {
                        object: "大力车队有限公司",
                        type: "应付",
                        costItem: "拖车费",
                        amount: 1,
                        totalAmount: 5000
                    },
                    {
                        object: "大力货代有限公司",
                        type: "应付",
                        costItem: "代理费",
                        amount: 1,
                        totalAmount: 4000
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters(["tenant"])
    },
    methods: {
        goBack() {
            this.$router.push({ name: "order" });
        },
        onSubmit() {
            console.log("submit!");
        }
    }
};
</script>

<style lang="scss" scoped>
.el-card >>> .el-card__body {
    padding: 10px 20px;
}
.el-page-header {
    line-height: 32px;
}
.el-page-header >>> .el-page-header__content {
    font-size: 16px;
}

.header-button {
    float: right;
    .operate-button {
        color: #929292;
    }
}

.create-alert {
    border-radius: 0;
}

.create-form {
    padding: 20px;
}

.form-item {
    width: 350px;
}
</style>