<template>
    <div class="app-container">
        <m-card>
            <template slot="body">
                <el-page-header @back="goBack" content="订单新增"></el-page-header>
            </template>
        </m-card>
        <el-row :gutter="20" class="mt-1">
            <el-col :span="14">
                <m-card>
                    <template slot="body">
                        <el-form ref="form" :model="form" label-width="80px" size="small">
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
                    </template>
                </m-card>
            </el-col>
            <el-col :span="10">
                <m-card type="cost" class="cost-card">
                    <template slot="body">
                        <div class="content">
                            <el-table
                                :data="form.costs"
                                header-cell-class-name="table-header"
                                size="small"
                            >
                                <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
                                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                <el-table-column prop="address" label="地址" width="200"></el-table-column>
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
                                <el-button type="primary" @click="onSubmit" size="small">创建订单</el-button>
                            </div>
                        </div>
                    </template>
                </m-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MCard from "@/components/MCard";
import MTable from "@/components/MTable";
import CardHeader from "@/components/MCard/components/Header";

export default {
    components: {
        MCard,
        CardHeader,
        MTable
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
                costs: [
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-04",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1517 弄"
                    },
                    {
                        date: "2016-05-01",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1519 弄"
                    },
                    {
                        date: "2016-05-03",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1516 弄"
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