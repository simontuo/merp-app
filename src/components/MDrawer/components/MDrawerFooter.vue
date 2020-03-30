<template>
    <div class="footer">
        <div class="operate-button-bar">
            <slot name="operate-button"></slot>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
    position: absolute; // 关键
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 20px;
    border-top: 1px solid #f2f6fc;
    background: #fff;
    .operate-button-bar {
        float: right;
    }
}
</style>