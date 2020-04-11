<template>
    <m-drawer ref="drawer" size="620">
        <template slot="content">
            <m-drawer-body v-loading="loading">
                <div slot="body" class="body">
                    <el-transfer
                        filterable
                        :titles="['未绑定', '已绑定']"
                        :filter-method="filterMethod"
                        filter-placeholder="请输入名称"
                        v-model="role.bindIds"
                        :data="users"
                    ></el-transfer>
                </div>
            </m-drawer-body>
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
import { roleBind, roleProfile } from "@/api/role";
import { userList } from "@/api/user";

export default {
    components: {
        MDrawer,
        MDrawerFooter,
        MDrawerBody
    },
    data() {
        return {
            loading: false,
            id: "",
            users: [],
            role: {
                id: "",
                label: "",
                bindIds: []
            },
            value: [],
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            }
        };
    },
    methods: {
        show(title) {
            this.$refs.drawer.title = title;
            this.$refs.drawer.show();
            roleProfile({ id: this.id }).then(response => {
                this.role = response.data;
            });
            userList().then(response => {
                this.users = response.data.items;
            });
        },
        submit() {
            this.loading = true;
            roleBind(this.role)
                .then(response => {
                    this.$message.success(response.message);
                })
                .catch(response => {
                    this.$message.error(response.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.body {
    padding: 20px;
}
</style>