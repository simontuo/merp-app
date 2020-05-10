<template>
    <div>
        <svg-icon icon-class="calendar" @click="click" class="calendar" />
        <m-drawer ref="drawer" size="80%" direction="ttb">
            <template slot="content">
                <split-pane split="vertical" :default-percent="70">
                    <template slot="paneL">
                        <el-calendar v-model="value"></el-calendar>
                    </template>
                    <template slot="paneR">
                        <div class="info-list">
                            <info-card></info-card>
                            <info-card></info-card>
                        </div>
                    </template>
                </split-pane>
            </template>
        </m-drawer>
    </div>
</template>

<script>
import MDrawer from "@/components/MDrawer";
import splitPane from "vue-splitpane";
import InfoCard from "./components/InfoCard";

export default {
    components: {
        MDrawer,
        splitPane,
        InfoCard
    },
    data() {
        return {
            value: new Date()
        };
    },
    methods: {
        click() {
            this.$refs.drawer.title = "日历";
            this.$refs.drawer.show();
        }
    }
};
</script>

<style lang="scss" scoped>
.calendar {
    font-size: 20px;
}

.info-list {
    padding: 10px;
}
</style>