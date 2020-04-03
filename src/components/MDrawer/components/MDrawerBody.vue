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
        // this.$refs.body.style.height = height + "px";
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