<template>
    <el-drawer
        id="public-drawer"
        :title="title"
        :append-to-body="true"
        :visible.sync="drawer"
        :direction="direction"
    >
        <slot name="content"></slot>
    </el-drawer>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            direction: "rtl",
            title: ""
        };
    },
    methods: {
        show() {
            this.drawer = !this.drawer;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>