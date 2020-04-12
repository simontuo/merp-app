<template>
    <el-drawer
        id="public-drawer"
        ref="drawer"
        :title="title"
        :append-to-body="true"
        :visible.sync="drawer"
        :direction="direction"
        :destroy-on-close="true"
        :size="size"
    >
        <slot name="content"></slot>
    </el-drawer>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: "30%"
        }
    },
    data() {
        return {
            drawer: false,
            direction: "rtl",
            title: ""
        };
    },
    methods: {
        show() {
            this.drawer = true;
        },
        close() {
            this.drawer = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.el-drawer__wrapper >>> .el-drawer__header {
    font-size: 16px;
    margin-bottom: 5px;
    padding-bottom: 20px;
    background-color: rgb(250, 250, 250);
}
</style>