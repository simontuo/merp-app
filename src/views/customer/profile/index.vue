<template>
    <div class="app-container">
        <div v-if="customer">
            <el-row :gutter="20">
                <el-col :span="6" :xs="24">
                    <info-card :customer="customer" />
                </el-col>

                <el-col :span="18" :xs="24">
                    <el-card>
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="数据统计" name="statistics">
                                <statistics />
                            </el-tab-pane>
                            <el-tab-pane label="详情信息" name="profile">
                                <profile-form :customer="customer" />
                            </el-tab-pane>
                            <el-tab-pane label="开票信息" name="invoice">
                                <Invoice />
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
import Invoice from "./components/Invoice";
import ProfileForm from "./components/ProfileForm";
import CustomerAddress from "./components/CustomerAddress";
import Statistics from "./components/Statistics/index";
import { profile } from "@/api/customer";

export default {
    name: "Profile",
    components: {
        InfoCard,
        Invoice,
        ProfileForm,
        CustomerAddress,
        Statistics
    },
    data() {
        return {
            customer: {},
            activeTab: "statistics"
        };
    },
    computed: {
        ...mapGetters(["name", "avatar", "roles"])
    },
    created() {
        this.getCustomer();
        profile({ id: this.$route.query.id }).then(response => {
            console.log(response);
        });
    },
    methods: {
        getCustomer() {
            this.customer = {
                name: this.name,
                role: this.roles.join(" | "),
                email: "admin@test.com",
                avatar: this.avatar
            };
        }
    }
};
</script>
