<template>
    <m-drawer ref="drawer">
        <template slot="content"></template>
    </m-drawer>
</template>

<script>
import MDrawer from "@/components/MDrawer";

export default {
    components: {
        MDrawer
    },
    data() {
        return {};
    },
    methods: {
        show(title) {
            this.$refs.drawer.title = title;
            this.$refs.drawer.show();
        }
    }
};
</script>

<style lang="scss">
</style>