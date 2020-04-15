<template>
    <div class="app-container">
        <div v-if="supplier">
            <el-row :gutter="20">
                <el-col :span="6" :xs="24">
                    <info-card :supplier="supplier" />
                </el-col>

                <el-col :span="18" :xs="24">
                    <el-card>
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="详情信息" name="profile">
                                <profile-form :supplier="supplier" />
                            </el-tab-pane>
                            <el-tab-pane label="数据统计" name="statistics">
                                <statistics />
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
import ProfileForm from "./components/ProfileForm";
import Statistics from "./components/Statistics/index";
import { supplierProfile } from "@/api/supplier";

export default {
    name: "Profile",
    components: {
        InfoCard,
        ProfileForm,
        Statistics
    },
    data() {
        return {
            supplier: {},
            activeTab: "profile"
        };
    },
    created() {
        supplierProfile({ id: this.$route.query.id }).then(response => {
            this.supplier = response.data;
        });
    }
};
</script>
