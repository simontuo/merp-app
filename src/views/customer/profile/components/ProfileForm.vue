<template>
    <el-form size="small" v-loading="loading" v-model="customer">
        <el-form-item label="名称">
            <el-input v-model.trim="customer.name" />
        </el-form-item>
        <el-form-item label="助记码">
            <el-input v-model.trim="customer.mnemonic_code" />
        </el-form-item>
        <el-form-item label="联系人">
            <el-input v-model.trim="customer.contact" />
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input v-model.trim="customer.contact_phone" />
        </el-form-item>
        <el-form-item label="联系地址">
            <el-input v-model.trim="customer.contact_address" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit" :disabled="loading">更新</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { customerUpdate, customerProfile } from "@/api/customer";

export default {
    props: {
        customer: {
            type: Object,
            default: () => {
                return {
                    id: "",
                    name: "",
                    mnemonic_code: "",
                    contact: "",
                    contact_phone: "",
                    contact_address: ""
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
