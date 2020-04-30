<template>
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
                        <el-input v-model="form.name" disabled class="form-item-width"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="消费使用单位" required class="form-item">
                        <el-input v-model="form.customerId" class="form-item-width"></el-input>
                    </el-form-item>
                    <el-form-item label="社会信用代码" required class="form-item">
                        <el-input v-model="form.name" disabled class="form-item-width"></el-input>
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
</template>

<script>
import MCard from "@/components/MCard";

export default {
    components: {
        MCard
    },
    data() {
        return {
            form: {}
        };
    }
};
</script>

<style lang="scss" scoped>
.create-form {
    padding: 20px;
}
</style>