<template>
    <div class="home-header">
        <span class="home-header-logo">
            <i class="iconfont icon-typescript"></i>
        </span>
        <span class="home-header-title">在线考勤系统</span>
        <el-dropdown>
            <el-badge :value="3">
                <el-icon :size="20"><Bell /></el-icon>
            </el-badge>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>无最新消息</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-dropdown>
            <el-space class="home-header-sound">
                <el-avatar :src="String(head)" />{{ name }}
            </el-space>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="logout">安全退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '../../../store';
import { computed } from 'vue'
const store = useStore();
// 头像
const head = computed(() => store.state.users.infos.head);
// 名字
const name = computed(() => store.state.users.infos.name);
// 退出功能
const logout = () => {
    // 首先清空token
    store.commit('users/REMOVE_TOKEN');
    // 再跳转到登录页面
    window.location.href = '/login';
}

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
    .home-header-sound {
        margin-left: 20px;
    }
}
</style>