<template>
    <el-form size="small" v-loading="loading">
        <el-form-item label="名称">
            <el-input v-model.trim="customer.name" />
        </el-form-item>
        <el-form-item label="联系人">
            <el-input v-model.trim="customer.email" />
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input v-model.trim="customer.email" />
        </el-form-item>
        <el-form-item label="联系地址">
            <el-input v-model.trim="customer.email" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">更新</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { customerUpdate } from "@/api/customer";

export default {
    props: {
        customer: {
            type: Object,
            default: () => {
                return {
                    id: "",
                    name: "",
                    email: ""
                };
            }
        }
    },
    data() {
        return {
            loading: false
        };
    },
    methods: {
        submit() {
            this.loading = true;
            customerUpdate(this.customer)
                .then(response => {
                    this.$message.success(response.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>
