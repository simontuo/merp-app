<template>
    <el-table
        ref="mTable"
        v-loading="search.loading"
        :data="search.items"
        element-loading-text="Loading"
        fit
        highlight-current-row
        header-cell-class-name="table-header"
        :size="setting.size"
        @selection-change="handleSelect"
    >
        <slot name="columns"></slot>
    </el-table>
</template>

<script>
export default {
    computed: {
        setting() {
            return this.$store.state.app.table;
        },
        search() {
            return this.$store.state.search;
        }
    },
    mounted() {
        bus.$on("clearSelectedStatus", () => {
            this.$refs.mTable.clearSelection();
        });
        bus.$on("exportExcel", response => {
            this.handleDownload(response.selected);
        });
    },
    methods: {
        handleSelect(rows) {
            bus.$emit("selectionChange", {
                rows: rows
            });
        },
        handleDownload(selected) {
            if (selected && this.$refs.mTable.selection.length < 1) {
                this.$message({
                    message: "请勾选需要导出的数据",
                    type: "warning"
                });

                return false;
            }
            const list = selected
                ? this.$refs.mTable.selection
                : this.$refs.mTable.tableData;

            this.$store.dispatch("search/loadingOn");
            import("@/vendor/Export2Excel").then(excel => {
                const tHeader = [];
                for (let index in this.$refs.mTable.columns) {
                    let name = this.$refs.mTable.columns[index]["label"];
                    if (name && name !== "操作") {
                        tHeader.push(name);
                    }
                }
                const filterVal = list.length > 0 ? Object.keys(list[0]) : [];
                const data = this.formatJson(filterVal, list);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: this.filename,
                    autoWidth: this.autoWidth,
                    bookType: this.bookType
                });
                this.$store.dispatch("search/loadingOff");
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "timestamp") {
                        return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        },
        selectedIds() {
            let ids = [];
            for (let index in this.$refs.mTable.selection) {
                ids.push(this.$refs.mTable.selection[index]["id"]);
            }
            return ids;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>