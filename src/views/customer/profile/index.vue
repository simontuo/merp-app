<template>
    <div class="app-container">
        <div v-if="user">
            <el-row :gutter="20">
                <el-col :span="6" :xs="24">
                    <info-card :user="user" />
                </el-col>

                <el-col :span="18" :xs="24">
                    <el-card>
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="数据统计" name="activity">
                                <activity />
                            </el-tab-pane>
                            <el-tab-pane label="详情信息" name="account">
                                <account :user="user" />
                            </el-tab-pane>
                            <el-tab-pane label="开票信息" name="timeline">
                                <timeline />
                            </el-tab-pane>
                            <el-tab-pane label="装卸地址" name="address">
                                <customer-address />
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import InfoCard from "./components/InfoCard";
import Activity from "./components/Activity";
import Timeline from "./components/Timeline";
import Account from "./components/Account";
import CustomerAddress from "./components/CustomerAddress";
import { profile } from "@/api/customer";

export default {
    name: "Profile",
    components: { InfoCard, Activity, Timeline, Account, CustomerAddress },
    data() {
        return {
            user: {},
            activeTab: "activity"
        };
    },
    computed: {
        ...mapGetters(["name", "avatar", "roles"])
    },
    created() {
        this.getUser();
        profile({ id: this.$route.query.id }).then(response => {
            console.log(response);
        });
    },
    methods: {
        getUser() {
            this.user = {
                name: this.name,
                role: this.roles.join(" | "),
                email: "admin@test.com",
                avatar: this.avatar
            };
        }
    }
};
</script>
