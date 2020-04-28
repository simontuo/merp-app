<template>
    <div class="app-container">
        <m-card>
            <template slot="body">
                <el-page-header @back="goBack" content="订单新增"></el-page-header>
            </template>
        </m-card>
        <div class="components-container">
            <split-pane split="vertical" :default-percent="40">
                <template slot="paneL">
                    <div class="left-container">
                        <el-form
                            ref="form"
                            :model="form"
                            label-width="120px"
                            size="small"
                            label-position="left"
                        >
                            <el-form-item label="收款人" required>
                                <el-input v-model="tenant.name" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="结算人" required>
                                <el-input v-model="form.customerId"></el-input>
                            </el-form-item>
                            <el-form-item label="订单类型" required>
                                <el-radio-group v-model="form.type" size="small">
                                    <el-radio label="0">进口</el-radio>
                                    <el-radio label="1">出口</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="货类" required>
                                <el-radio-group v-model="form.goodsType" size="small">
                                    <el-radio label="0">普货</el-radio>
                                    <el-radio label="1">冻柜</el-radio>
                                    <el-radio label="2">危险品</el-radio>
                                    <el-radio label="3">散货</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="货物到港日期">
                                <el-date-picker
                                    v-model="form.goodsArriveDate"
                                    type="date"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="免箱期">
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
                            <el-form-item label="滞柜期限">
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
                            <el-form-item label="免堆期">
                                <el-date-picker
                                    v-model="form.freePileDate"
                                    type="date"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="滞堆期限">
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
                            <el-form-item label="CFS作业"></el-form-item>
                            <el-form-item label="入仓起始时间"></el-form-item>
                            <el-form-item label="仓库免堆期"></el-form-item>
                            <el-form-item label="仓库名称"></el-form-item>
                            <el-form-item label="CFS拆箱起始时间"></el-form-item>
                            <el-form-item label="CFS拆箱完成时间"></el-form-item>
                            <el-form-item label="CFS拆箱异常情况记录"></el-form-item>
                            <el-form-item label="CFS拆箱起始时间"></el-form-item>
                            <el-form-item label="CFS拆箱起始时间"></el-form-item>
                        </el-form>
                    </div>
                </template>
                <template slot="paneR">
                    <split-pane split="horizontal" :default-percent="30">
                        <template slot="paneL">
                            <div class="top-container">
                                <div class="bottom-container container-card">
                                    <div class="content">
                                        <el-table
                                            :data="form.containers"
                                            header-cell-class-name="table-header"
                                            size="small"
                                        >
                                            <el-table-column
                                                type="index"
                                                label="#"
                                                width="50"
                                                align="center"
                                            ></el-table-column>
                                            <el-table-column
                                                prop="waybillNumber"
                                                label="运单号"
                                                width="180"
                                            ></el-table-column>
                                            <el-table-column
                                                prop="containerNumber"
                                                label="箱号"
                                                width="180"
                                            ></el-table-column>
                                            <el-table-column
                                                prop="sealNumber"
                                                label="封号"
                                                width="200"
                                            ></el-table-column>
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
                                </div>
                            </div>
                        </template>
                        <template slot="paneR">
                            <div class="bottom-container cost-card">
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
                                        <el-table-column prop="type" label="收/付" width="50"></el-table-column>
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
                                    <div class="submit">
                                        <el-button type="text" size="small">取消</el-button>
                                        <el-button
                                            type="primary"
                                            @click="onSubmit"
                                            size="small"
                                        >创建订单</el-button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </split-pane>
                </template>
            </split-pane>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import MCard from "@/components/MCard";
import MTable from "@/components/MTable";
import CardHeader from "@/components/MCard/components/Header";
import splitPane from "vue-splitpane";

export default {
    components: {
        MCard,
        CardHeader,
        MTable,
        splitPane
    },
    data() {
        return {
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
                containers: [
                    {
                        waybillNumber: "12334234",
                        containerNumber: "THSB1133244",
                        sealNumber: "1333"
                    }
                ],
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
// .el-radio {
//     margin-right: 0;
// }

.container-card {
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

.components-container {
    position: relative;
    height: 100vh;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    margin-top: 10px;
}

.left-container {
    height: 100%;
    padding: 20px;
}

.right-container {
    height: 200px;
}

.top-container {
    width: 100%;
    height: 100%;
}

.bottom-container {
    width: 100%;
    height: 100%;
}
</style>