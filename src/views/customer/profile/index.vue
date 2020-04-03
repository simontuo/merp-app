<template>
    <div class="app-container"></div>
</template>

<script>
import { profile } from "@/api/customer";

export default {
    data() {
        return {
            data: []
        };
    },
    created() {
        profile({ id: this.$route.query.id }).then(response => {
            this.data = response.data.data;
        });
    }
};
</script>

<style lang="scss" scoped>
</style>

