<template>
    <el-form size="small">
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
export default {
    props: {
        customer: {
            type: Object,
            default: () => {
                return {
                    name: "",
                    email: ""
                };
            }
        }
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
