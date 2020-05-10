<template>
    <div>
        <svg-icon icon-class="calendar" @click="click" class="calendar" />
        <m-drawer ref="drawer" size="80%" direction="ttb" class="drawer">
            <template slot="content">
                <split-pane
                    split="vertical"
                    :default-percent="70"
                    ref="split"
                    :style="{height: height}"
                    class="split"
                >
                    <template slot="paneL">
                        <el-calendar v-model="value">
                            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                            <template slot="dateCell" slot-scope="{date, data}">
                                <div @click="dateClick(data)" class="date">
                                    <div
                                        class="calendar-day"
                                    >{{ data.day.split('-').slice(2).join('-') }}</div>
                                    <div v-for="(item, index) in calendarData" :key="index">
                                        <div
                                            v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1"
                                        >
                                            <div
                                                v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1"
                                            >
                                                <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    :content="item.things"
                                                    placement="right"
                                                >
                                                    <div class="is-selected">{{item.things}}</div>
                                                </el-tooltip>
                                            </div>
                                            <div v-else></div>
                                        </div>
                                        <div v-else></div>
                                    </div>
                                </div>
                            </template>
                        </el-calendar>
                    </template>
                    <template slot="paneR">
                        <div class="info-list" v-loading="loading">
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
            height: "",
            calendarData: [
                { months: ["05", "11"], days: ["15"], things: "看电影" },
                { months: ["10", "11"], days: ["02"], things: "去公园野炊" },
                { months: ["11"], days: ["02"], things: "看星星" },
                { months: ["11"], days: ["02"], things: "看月亮" }
            ],
            loading: false,
            value: new Date()
        };
    },
    mounted() {
        this.height = document.documentElement.clientHeight * 0.8 - 66 + "px";
    },
    methods: {
        click() {
            this.$refs.drawer.title = "日历";
            this.$refs.drawer.show();
        },
        dateClick(data) {
            console.log(data);
        }
    }
};
</script>

<style lang="scss" scoped>
.split {
    overflow-y: scroll;
}

.calendar {
    font-size: 20px;
}
.date {
    height: 100%;
}

.calendar-day {
    text-align: center;
    color: #202535;
    line-height: 30px;
    font-size: 12px;
}
.is-selected {
    color: coral;
    font-size: 10px;
    margin-top: 5px;
}

.info-list {
    padding: 10px;
}
</style>