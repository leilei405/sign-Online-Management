<template>
    <div class="home-header">
        <span class="home-header-logo">
            <i class="iconfont icon-typescript"></i>
        </span>
        <span class="home-header-title">在线考勤系统</span>
        <el-dropdown>
            <el-badge :value="3" class="home-header-sound">
                <el-icon ><Bell /></el-icon>
            </el-badge>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>无最新消息</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-dropdown>
            <el-space >
                <el-avatar src="http://api.h5ke.top/uploads/626c7236e0c7edf6ce507708.png" />冯雷雷
            </el-space>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>安全退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.home-header {
    font-size: 34px;
    display: flex;
    align-items: center;
    height: 100%;
    .home-header-logo {
        .icon-typescript {
            margin-right: 5px;
            font-size: 34px;
            color: aqua;
        }
    }
    .home-header-title {
        margin-left: 30px;
        font-weight: 700;
        font-size: 18px;
        margin-right: auto;
    }
    .el-dropdown {
        margin-left: 20px;
        margin-top: 5px;
    }
}
</style>