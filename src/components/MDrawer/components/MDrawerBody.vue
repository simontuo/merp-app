<template>
    <div class="body" ref="body">
        <slot name="body"></slot>
    </div>
</template>

<script>
export default {
    mounted() {
        // let height =
        //     document.documentElement.clientHeight -
        //     this.$refs.body.offsetHeight -
        //     50;

        let height = document.documentElement.clientHeight - 66 + "px";
        this.$refs.body.style.height = height;
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