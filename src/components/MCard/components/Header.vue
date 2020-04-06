<template>
    <div class="card-operate-bar clearfix">
        <span class="card-title">{{title}}</span>
        <div class="card-button-bar">
            <!-- 功能按钮 -->
            <slot name="functionButton"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardOperateBar",
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.card-operate-bar {
    // margin: 0 20px;
    line-height: 45px;
    .card-title {
        font-size: 16px;
        color: #929292;
    }
    .card-button-bar {
        float: right;
        .operate-button {
            font-size: 16px;
            color: #929292;
        }
    }
}
</style>