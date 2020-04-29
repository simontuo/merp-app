<template>
    <el-select
        v-model="value"
        :multiple="multiple"
        clearable
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
        class="search-item-width"
    >
        <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.name"
            :value="item.id"
        >
            <template v-if="template">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.mnemonicCode }}</span>
            </template>
        </el-option>
    </el-select>
</template>

<script>
export default {
    props: {
        template: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: true
        },
        remoteFunction: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            searchComponent: true,
            options: [],
            value: [],
            loading: false
        };
    },
    methods: {
        remoteMethod(query) {
            if (this.remoteFunction && query !== "") {
                this.loading = true;
                this.remoteFunction(query)
                    .then(response => {
                        this.options = response.data.items;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                this.options = [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>