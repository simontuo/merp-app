<template>
    <el-select v-model="value" :multiple="multiple" placeholder="请选择" clearable>
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
    </el-select>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default: []
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            searchComponent: true,
            value: ""
        };
    }
};
</script>