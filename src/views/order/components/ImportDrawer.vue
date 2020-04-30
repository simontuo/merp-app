<template>
    <m-drawer ref="drawer">
        <template slot="content">
            <div class="body">
                <div class="download-template">
                    模板下载：
                    <el-link type="primary">订单信息</el-link>
                    <el-link type="primary">货物信息</el-link>
                </div>
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <m-drawer-footer>
                <template slot="operate-button">
                    <el-button size="small">重置</el-button>
                    <el-button size="small" type="primary" @click="submit">保存</el-button>
                </template>
            </m-drawer-footer>
        </template>
    </m-drawer>
</template>

<script>
import MDrawer from "@/components/MDrawer";
import MDrawerFooter from "@/components/MDrawer/components/MDrawerFooter";
import MDrawerBody from "@/components/MDrawer/components/MDrawerBody";

export default {
    components: {
        MDrawer,
        MDrawerFooter,
        MDrawerBody
    },
    data() {
        return {
            loading: false
        };
    },
    methods: {
        show(title) {
            this.$refs.drawer.title = title;
            this.$refs.drawer.show();
        },
        submit() {}
    }
};
</script>

<style lang="scss">
.body {
    padding: 20px;
    text-align: center;
    .download-template {
        text-align: left;
        margin-bottom: 20px;
    }
}
</style>