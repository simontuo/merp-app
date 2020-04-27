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
                            label-width="80px"
                            size="small"
                            label-position="left"
                        >
                            <el-form-item label="活动名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="活动区域">
                                <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动时间">
                                <el-col :span="11">
                                    <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="form.date1"
                                        style="width: 100%;"
                                    ></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                    <el-time-picker
                                        placeholder="选择时间"
                                        v-model="form.date2"
                                        style="width: 100%;"
                                    ></el-time-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="即时配送">
                                <el-switch v-model="form.delivery"></el-switch>
                            </el-form-item>
                            <el-form-item label="活动性质">
                                <el-checkbox-group v-model="form.type">
                                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="特殊资源">
                                <el-radio-group v-model="form.resource">
                                    <el-radio label="线上品牌商赞助"></el-radio>
                                    <el-radio label="线下场地免费"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="活动形式">
                                <el-input type="textarea" v-model="form.desc"></el-input>
                            </el-form-item>
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