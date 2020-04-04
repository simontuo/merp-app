<template>
    <div class="table-selected-bar clearfix">
        <span class="selected-title">
            <svg-icon icon-class="info" class="title-icon" />已选择
            <span class="selected-number">{{selected}}</span>
            项 {{describe}}
        </span>
        <el-button type="text" class="selected-button" @click="handelClear">清除</el-button>
    </div>
</template>

<script>
export default {
    props: ["describe"],
    data() {
        return {
            selected: 0
        };
    },
    mounted() {
        bus.$on("selectionChange", response => {
            this.selected = response.rows.length;
        });
    },
    methods: {
        handelClear() {
            bus.$emit("clearSelectedStatus");
        }
    }
};
</script>

<style lang="scss" scoped>
.table-selected-bar {
    margin: 5px 20px;
    line-height: 40px;
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    padding: 0 20px;
    border-radius: 2px;
    .selected-title {
        font-size: 14px;
        color: #929292;
        .title-icon {
            color: rgb(24, 144, 255);
            margin-right: 10px;
        }
    }
    .selected-number {
        color: rgb(24, 144, 255);
    }
    .selected-button {
        float: right;
        font-size: 14px;
        color: rgb(24, 144, 255);
    }
}
</style>