<template>
    <el-container>
        <!-- 头部 -->
      <el-header>
        <home-header></home-header>
      </el-header>
      <!-- 主体 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside>
            <home-aside></home-aside>
        </el-aside>
        <!-- 内容区域 -->
        <el-main>
            <!-- 面包屑 -->
            <home-breadcrumb></home-breadcrumb>
            <!-- 主体main -->
            <home-main></home-main>
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import HomeHeader from '@/views/Home/components/HomeHeader.vue';
import HomeAside from '@/views/Home/components/HomeAside.vue';
import HomeMain from '@/views/Home/components/HomeMain.vue';
import HomeBreadcrumb from '@/views/Home/components/HomeBreadcrumb.vue';
defineComponent({
    name: "HomeView",
})
</script>

<style scoped lang="scss">
.el-header{
    box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
}
.el-aside{
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
.el-main{
    background: #f0f2f5;
    display: flex;
    flex-direction: column;
}
.el-aside {
    width: 255px;
}
</style>