<template>
    <el-input v-model="value" :placeholder="placeholder" class="search-item-width" clearable></el-input>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: ""
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