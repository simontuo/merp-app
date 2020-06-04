<template>
    <div>
        <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleProgress"
        >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                    >
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            fileList: []
        };
    },
    methods: {
        handleRemove(file) {
            console.log(file);
        },
        handleProgress(file, fileList) {
            this.fileList = fileList;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            console.log(this.files);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>