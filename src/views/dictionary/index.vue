<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <el-tab-pane label="货物名称" name="goods">
                <goods ref="goods" v-show="activeName === 'goods'" />
            </el-tab-pane>
            <el-tab-pane label="费用项目" name="costItem">
                <cost-item ref="costItem" v-show="activeName === 'costItem'" />
            </el-tab-pane>
            <el-tab-pane label="CRM对象类型" name="supplierType">
                <supplier-type ref="supplierType" v-show="activeName === 'supplierType'" />
            </el-tab-pane>
            <el-tab-pane label="集装箱类型" name="containerType">
                <container-type ref="containerType" v-show="activeName === 'containerType'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Goods from "./components/Goods";
import CostItem from "./components/CostItem";
import SupplierType from "./components/SupplierType";
import ContainerType from "./components/ContainerType";

export default {
    components: {
        Goods,
        CostItem,
        SupplierType,
        ContainerType
    },
    data() {
        return {
            activeName: "goods"
        };
    },
    methods: {
        handleClick(activeName) {
            // this.$refs[activeName.name].search();
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

