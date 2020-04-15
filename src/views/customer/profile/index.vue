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
                            <el-tab-pane label="详情信息" name="profile">
                                <profile-form :customer="customer" v-if="activeTab === 'profile'" />
                            </el-tab-pane>
                            <el-tab-pane label="数据统计" name="statistics">
                                <statistics v-if="activeTab === 'statistics'" />
                            </el-tab-pane>
                            <el-tab-pane label="开票信息" name="invoice">
                                <Invoice v-if="activeTab === 'invoice'" />
                            </el-tab-pane>
                            <el-tab-pane label="装卸地址" name="address">
                                <customer-address v-if="activeTab === 'address'" />
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import InfoCard from "./components/InfoCard";
import Invoice from "./components/Invoice";
import ProfileForm from "./components/ProfileForm";
import CustomerAddress from "./components/Adress";
import Statistics from "./components/Statistics/index";
import { customerProfile } from "@/api/customer";

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
            activeTab: "profile"
        };
    },
    computed: {
        id() {
            return parseInt(this.$route.query.id);
        }
    },
    created() {
        customerProfile({ id: this.$route.query.id }).then(response => {
            this.customer = response.data;
        });
    }
};
</script>
