<template>
    <div class="app-container">
        <sticky :sticky-top="0">
            <m-card type="profile">
                <template slot="body">
                    <el-row>
                        <el-col :span="18">
                            <el-page-header @back="goBack" content="订单新增"></el-page-header>
                        </el-col>
                        <el-col :span="6">
                            <div class="header-button">
                                <el-button type="text" size="small">导入模板</el-button>
                                <el-divider direction="vertical"></el-divider>
                                <el-button type="primary" @click="onSubmit" size="small">创建订单</el-button>
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
                                        <el-radio label="0">进口</el-radio>
                                        <el-radio label="1">出口</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="货类" required>
                                    <el-radio-group v-model="form.goodsType" size="small">
                                        <el-radio label="0">普货</el-radio>
                                        <el-radio label="1">冻柜</el-radio>
                                        <el-radio label="2">危险品</el-radio>
                                        <el-radio label="3">散货</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="货物到港日期" class="form-item">
                                    <el-date-picker
                                        v-model="form.goodsArriveDate"
                                        type="date"
                                        placeholder="选择日期"
                                    ></el-date-picker>
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
                                        <el-date-picker
                                            v-model="form.freeContainerDate"
                                            type="date"
                                            placeholder="选择日期"
                                        ></el-date-picker>
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
                                    <el-date-picker
                                        v-model="form.freePileDate"
                                        type="date"
                                        placeholder="选择日期"
                                    ></el-date-picker>
                                </el-form-item>
                                <el-form-item label="滞堆期限" class="form-item">
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="系统根据货物到港日期及免箱期自动逻辑计算最终还箱期限时间。"
                                        placement="right"
                                    >
                                        <el-date-picker
                                            v-model="form.strandedPileDate"
                                            type="date"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-tooltip>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="仓库名称" class="form-item">
                                    <el-input v-model="form.warehouseName" class="form-item-width"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-form-item label="入仓起始时间" class="form-item">
                                <el-date-picker
                                    v-model="form.enterWarehouseAt"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="仓库免堆期" class="form-item">
                                <el-date-picker
                                    v-model="form.fressWarehouseDate"
                                    type="date"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </el-form-item>
                            <el-row></el-row>
                            <el-row>
                                <el-form-item label="CFS作业">
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
                    <m-card type="cost">
                        <template slot="body">
                            <el-alert title="货物信息基本情况" :closable="false" class="create-alert"></el-alert>
                            <el-form
                                class="create-form"
                                ref="form"
                                :model="form"
                                label-width="130px"
                                size="small"
                                label-position="left"
                                :inline="true"
                            >
                                <el-row>
                                    <el-form-item label="经营单位" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                    <el-form-item label="社会信用代码" required class="form-item">
                                        <el-input
                                            v-model="tenant.name"
                                            disabled
                                            class="form-item-width"
                                        ></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="消费使用单位" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                    <el-form-item label="社会信用代码" required class="form-item">
                                        <el-input
                                            v-model="tenant.name"
                                            disabled
                                            class="form-item-width"
                                        ></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="贸易方式" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                    <el-form-item label="备案号" required>
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="货物存放地" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                    <el-form-item label="贸易国" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="包装种类" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                    <el-form-item label="境内目的地" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="入境口岸" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="特殊关系确认" required class="form-item">
                                        <el-radio-group v-model="form.type" size="small">
                                            <el-radio label="0">是</el-radio>
                                            <el-radio label="1">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="价格影响确认" required class="form-item">
                                        <el-radio-group v-model="form.type" size="small">
                                            <el-radio label="0">是</el-radio>
                                            <el-radio label="1">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="支付特许权使用费确认" required class="form-item">
                                        <el-radio-group v-model="form.type" size="small">
                                            <el-radio label="0">是</el-radio>
                                            <el-radio label="1">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="海关编码" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                    <el-form-item label="中文品名" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="申报要素" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                    <el-form-item label="数量及单位" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="总价/币制" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                    <el-form-item label="单价" required class="form-item">
                                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                        </template>
                    </m-card>
                </el-row>
                <el-row class="mt-1">
                    <m-card type="cost" class="cost-card">
                        <template slot="body">
                            <div class="content">
                                <el-table
                                    :data="form.costs"
                                    header-cell-class-name="table-header"
                                    size="small"
                                >
                                    <el-table-column
                                        type="index"
                                        label="#"
                                        width="50"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column prop="object" label="核算对象"></el-table-column>
                                    <el-table-column prop="type" label="收/付" width="80"></el-table-column>
                                    <el-table-column prop="costItem" label="费用项目" width="80"></el-table-column>
                                    <el-table-column prop="amount" label="数量" width="50"></el-table-column>
                                    <el-table-column prop="totalAmount" label="单价" width="80"></el-table-column>
                                    <el-table-column prop="totalAmount" label="总价" width="80"></el-table-column>
                                    <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="100"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <el-button
                                                type="text"
                                                size="small"
                                                @click="handelDelete(scope.row.id)"
                                            >删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="total">
                                <span class="receivable">应收：5000</span>
                                <span class="pay">应付：4500</span>
                                <span>毛利：500</span>
                            </div>
                            <div class="footer clearfix">
                                <el-button type="text" size="small">新增费用</el-button>
                            </div>
                        </template>
                    </m-card>
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

export default {
    components: {
        MCard,
        CardHeader,
        MTable,
        Sticky
    },
    data() {
        return {
            form: {
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

.cost-card {
    .header {
        margin: 0 20px;
    }
    .total {
        padding: 10px 20px;
        font-size: 12px;
        background-color: #fafafa;
        span {
            margin-right: 20px;
        }
        .receivable {
            color: #67c23a;
        }
        .pay {
            color: #f56c6c;
        }
    }
    .footer {
        margin: 10px 20px;
        .submit {
            float: right;
        }
    }
}
</style>