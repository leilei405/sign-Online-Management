<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();
const breadcrumbs = computed(() => route.matched);

</script>

<style scoped lang="scss">
.el-breadcrumb {
    background: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 30px;
}
</style>