<template>
    <div class="body" :style="{height:height}">
        <slot name="body"></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            height: ""
        };
    },
    created() {
        this.height =
            document.body.clientHeight ||
            document.documentElement.clientHeight + "px";
    }
};
</script>

<style lang="scss" scoped>
.body {
    padding: 0 20px;
    overflow-y: auto;
}
.body::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
}
</style>