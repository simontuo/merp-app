<template>
    <div class="table-operate-bar clearfix">
        <span class="operate-title">{{title}}</span>
        <div class="operate-button-bar">
            <!-- 功能按钮 -->
            <slot name="functionButton"></slot>
            <template v-if="defaultOperateButton">
                <el-divider direction="vertical"></el-divider>
                <!-- 通用按钮 -->
                <el-tooltip content="全屏" placement="top">
                    <el-button type="text" class="operate-button">
                        <screenfull class="operate-button" />
                    </el-button>
                </el-tooltip>
                <el-tooltip content="密度" placement="top">
                    <el-dropdown class="operate-dropdown" trigger="click" @command="handleCommand">
                        <el-button type="text" class="operate-button">
                            <svg-icon icon-class="column-height" />
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="medium">默认</el-dropdown-item>
                            <el-dropdown-item command="small">中等</el-dropdown-item>
                            <el-dropdown-item command="mini">紧凑</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-tooltip>
                <el-tooltip content="刷新" placement="top">
                    <el-button type="text" class="operate-button" @click="refresh">
                        <svg-icon icon-class="reload" />
                    </el-button>
                </el-tooltip>
                <el-tooltip content="列设置" placement="top">
                    <el-button type="text" class="operate-button" @click="toggleDrawer('列设置')">
                        <svg-icon icon-class="seetings" />
                    </el-button>
                </el-tooltip>
                <el-dropdown class="operate-dropdown" trigger="click" @command="handleMoreCommand">
                    <el-button type="text" class="operate-button">
                        <svg-icon icon-class="more" />
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="exportExcel">导出Excel</el-dropdown-item>
                        <el-dropdown-item command="exportSelectedExcel">导出已选择项</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </div>
        <m-drawer ref="drawer" v-if="defaultOperateButton">
            <column-list slot="content" />
        </m-drawer>
    </div>
</template>

<script>
import Screenfull from "@/components/Screenfull";
import MDrawer from "@/components/MDrawer";
import ColumnList from "./components/ColumnList";

export default {
    name: "TableOperateBar",
    props: {
        title: {
            type: String,
            default: ""
        },
        defaultOperateButton: {
            type: Boolean,
            default: true
        }
    },
    inject: ["reload"],
    data() {
        return {
            settingDrawer: false,
            downloadLoading: false
        };
    },
    components: {
        Screenfull,
        MDrawer,
        ColumnList
    },
    methods: {
        handleCommand(command) {
            this.$store.dispatch("app/changeTableSize", { command });
        },
        handleMoreCommand(command) {
            switch (command) {
                case "exportExcel":
                    bus.$emit("exportExcel", {
                        selected: false
                    });
                    break;
                case "exportSelectedExcel":
                    bus.$emit("exportExcel", {
                        selected: true
                    });
                    break;
            }
        },
        toggleDrawer(title) {
            this.$refs.drawer.title = title;
            this.$refs.drawer.show();
        },
        refresh() {
            this.reload();
        }
    }
};
</script>

<style lang="scss" scoped>
.table-operate-bar {
    margin: 0 20px;
    line-height: 45px;
    .operate-title {
        font-size: 16px;
        color: #929292;
    }
    .operate-button-bar {
        float: right;
        .operate-dropdown {
            margin-left: 10px;
            margin-right: 10px;
            line-height: 1px;
            .operate-button {
                font-size: 18px;
                color: #929292;
            }
        }
        .operate-dropdown:last-child {
            margin-right: 0;
        }
        .operate-button {
            font-size: 16px;
            color: #929292;
        }
    }
}
</style>