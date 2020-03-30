<template>
    <div class="footer">
        <span>{{ footerInfo.title }}</span>
        <span>
            design buy
            <svg-icon icon-class="heart" />
        </span>
        <span>{{ footerInfo.author }}</span>
    </div>
</template>

<script>
export default {
    name: "MFooter",
    computed: {
        footerInfo() {
            return this.$store.state.settings.footerInfo;
        }
    }
};
</script>

<style lang="scss" scoped>
.footer {
    text-align: center;
    color: #606266;
    padding: 10px 0 30px 0;
}
</style>