<template>
    <div class="column-list">
        <div class="header">批量操作</div>
        <div class="filter">
            <el-input v-model="query" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="list">
            <slot name="item"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: ""
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.column-list {
    width: 200px;
    .header {
        text-align: center;
        margin-bottom: 10px;
    }
    .filter {
        margin: 5px 10px;
    }
    .list {
        // max-height: 300px;
        // overflow-y: scroll;

        .list-complete-item:hover {
            background-color: rgb(244, 244, 245);
        }
    }
}
</style>