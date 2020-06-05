<template>
    <div class="list-complete-item">
        <a>
            <span class="icon">
                <svg-icon :icon-class="icon" />
            </span>
            {{ label }}
        </a>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: ""
        }
    }
};
</script>
<style lang="scss" scoped>
.list-complete-item {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    // color: #909399;
    padding: 12px;
    transition: all 1s;
    .icon {
        margin-right: 5px;
    }
}
</style>