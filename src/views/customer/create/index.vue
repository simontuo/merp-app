<template>
    <div class="app-container">
        <el-card shadow="never" :body-style="{padding: '10px 20px'}">
            <el-page-header @back="goBack" content="客户新增"></el-page-header>
        </el-card>
        <m-card class="mt-1">
            <template slot="body">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form
                            ref="form"
                            :model="form"
                            label-width="120px"
                            size="small"
                            label-position="left"
                        >
                            <el-form-item label="名称" required>
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="类型" required>
                                <el-select v-model="form.crmTypeIds" multiple placeholder="请选择">
                                    <el-option
                                        v-for="item in crmTypes"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系人" required>
                                <el-input v-model="form.contact"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" required>
                                <el-input v-model="form.contactPhone"></el-input>
                            </el-form-item>
                            <el-form-item label="联系地址" required>
                                <el-input type="textarea" v-model="form.contactAddress"></el-input>
                            </el-form-item>
                            <el-form-item label="合同扫描件" required>
                                <contract-upload ref="contractUpload"></contract-upload>
                            </el-form-item>
                            <el-form-item label="合同有效期" required>
                                <el-date-picker
                                    v-model="form.contractPeriodOfValidity"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="合同金额" required>
                                <el-input v-model="form.contractTotalAmount" />
                            </el-form-item>
                            <el-form-item label="实报实销费用" required>
                                <el-select
                                    filterable
                                    multiple
                                    placeholder="请选择"
                                    v-model="form.reimbursementCostItem"
                                >
                                    <el-option
                                        v-for="item in costItems"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submit">立即创建</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-form ref="form" label-width="0px" size="small" label-position="left">
                            <el-form-item>
                                <span class="desc">this is a desc</span>
                            </el-form-item>
                            <el-form-item>
                                <span class="desc">this is a desc</span>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </template>
        </m-card>
    </div>
</template>

<script>
import MCard from "@/components/MCard";
import ContractUpload from "../components/ContractUpload";

export default {
    components: { MCard, ContractUpload },
    data() {
        return {
            crmTypes: [],
            costItems: [],
            form: {}
        };
    },
    methods: {
        goBack() {
            this.$router.push({ name: "customer" });
        },
        submit() {
            this.form.contractScanFiles = this.$refs.contractUpload.fileList;
            console.log(this.form);
        }
    }
};
</script>

<style lang="scss" scoped>
.el-page-header >>> .el-page-header__content {
    font-size: 14px;
}
.desc {
    color: #909399;
}
</style>