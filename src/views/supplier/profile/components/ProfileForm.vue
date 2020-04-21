<template>
    <el-form size="small" v-loading="loading" label-width="80px" label-position="left">
        <el-form-item label="名称" required>
            <el-input v-model.trim="supplier.name" />
        </el-form-item>
        <el-form-item label="助记码" required>
            <el-input v-model.trim="supplier.mnemonic_code" />
        </el-form-item>
        <el-form-item label="联系人" required>
            <el-input v-model.trim="supplier.contact" />
        </el-form-item>
        <el-form-item label="联系电话" required>
            <el-input v-model.trim="supplier.contact_phone" />
        </el-form-item>
        <el-form-item label="联系地址" required>
            <el-input v-model.trim="supplier.contact_address" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit" :disabled="loading">更新</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { supplierUpdate } from "@/api/supplier";

export default {
    props: {
        supplier: {
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
            supplierUpdate(this.supplier)
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
