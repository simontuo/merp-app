<template>
    <m-card type="cost" class="cost-card">
        <template slot="body">
            <div class="content">
                <el-table :data="costs" header-cell-class-name="table-header" size="small">
                    <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
                    <el-table-column prop="object" label="核算对象"></el-table-column>
                    <el-table-column prop="type" label="收/付" width="80"></el-table-column>
                    <el-table-column prop="costItem" label="费用项目" width="80"></el-table-column>
                    <el-table-column prop="amount" label="数量" width="50"></el-table-column>
                    <el-table-column prop="totalAmount" label="单价" width="80"></el-table-column>
                    <el-table-column prop="totalAmount" label="总价" width="80"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100" align="center">
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
                <el-button type="text" size="small" @click="addCost">新增费用</el-button>
            </div>
            <!-- 新增费用组件 -->
            <cost-drawer ref="costDrawer"></cost-drawer>
        </template>
    </m-card>
</template>

<script>
import MCard from "@/components/MCard";
import { CostDrawer } from "../components";

export default {
    props: {
        costs: {
            type: Array,
            default: []
        }
    },
    components: {
        MCard,
        CostDrawer
    },
    data() {
        return {};
    },
    methods: {
        addCost() {
            this.$refs.costDrawer.show("新增费用");
        },
        handelDelete(id) {}
    }
};
</script>

<style lang="scss">
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