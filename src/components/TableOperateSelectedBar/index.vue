<template>
    <div class="table-selected-bar clearfix">
        <span class="title">{{ title }}</span>
        <span class="selected-title">
            <svg-icon icon-class="info" class="title-icon" />已选择
            <span class="selected-number">{{selected}}</span>
            项 {{describe}}
        </span>
        <el-button type="text" class="selected-button" @click="handelClear" v-show="selected > 0">清除</el-button>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        describe: {
            type: String,
            default: ""
        }
    },
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
    .title {
        margin-right: 20px;
    }
    line-height: 40px;
    border-radius: 4px;
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