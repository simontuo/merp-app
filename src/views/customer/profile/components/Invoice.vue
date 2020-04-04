<template>
    <div class="block">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-form size="small">
                    <el-form-item label="开户银行">
                        <el-input v-model.trim="invoice.banck" />
                    </el-form-item>
                    <el-form-item label="银行账户">
                        <el-input v-model.trim="invoice.account" />
                    </el-form-item>
                    <el-form-item label="统一社会机构代码">
                        <el-input v-model.trim="invoice.no" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="14">
                <el-timeline>
                    <el-timeline-item
                        v-for="(item,index) of timeline"
                        :key="index"
                        :timestamp="item.timestamp"
                        placement="top"
                    >
                        <el-card>
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.content }}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            invoice: {
                banck: "",
                account: "",
                no: ""
            },
            timeline: [
                {
                    timestamp: "2019/4/20",
                    title: "Update Github template",
                    content: "PanJiaChen committed 2019/4/20 20:46"
                },
                {
                    timestamp: "2019/4/21",
                    title: "Update Github template",
                    content: "PanJiaChen committed 2019/4/21 20:46"
                },
                {
                    timestamp: "2019/4/22",
                    title: "Build Template",
                    content: "PanJiaChen committed 2019/4/22 20:46"
                },
                {
                    timestamp: "2019/4/23",
                    title: "Release New Version",
                    content: "PanJiaChen committed 2019/4/23 20:46"
                }
            ]
        };
    },
    methods: {
        submit() {
            this.$message({
                message: "User information has been updated successfully",
                type: "success",
                duration: 5 * 1000
            });
        }
    }
};
</script>
