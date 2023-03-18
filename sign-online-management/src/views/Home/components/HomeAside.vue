<template>
    <!-- :default-active="route.fullPath"  跳转到某一项菜单  fullPath 会匹配他一个整体  path不会匹配携带的参数 -->
    <el-menu :default-active="route.path" router>
        <el-sub-menu  v-for="item in menus" :key="item.path" :index="item.path">
            <template #title>
                <el-icon><component :is="item.meta?.icon"></component></el-icon>
                <span>{{ item.meta?.title }}</span>
            </template>
            <el-menu-item v-for="itemChild in item.children" :key="item.path + itemChild.path" :index="item.path + itemChild.path">
                <el-icon><component :is="itemChild.meta?.icon"></component></el-icon>
                <span>{{ itemChild.meta?.title }}</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { useRouter, RouteRecordName, useRoute  } from 'vue-router';
import _ from 'lodash';
// 权限通过状态管理去拿
import { useStore } from '../../../store';
const store = useStore();
const permission = store.state.users.infos.permission; // []

// 通过useRoute 拿到url
const route = useRoute();


const router = useRouter();  // 可以拿到所有的路由信息以及编程式路由方法
// 可以拿到路由信息 path meta的路径信息等等  进行筛选
const menus = _.cloneDeep(router.options.routes).filter((item) => {
    item.children = item.children?.filter((item) => 
        item.meta?.menu && (permission as (RouteRecordName | undefined)[]).includes(item.name)
    )
    return item.meta?.menu && (permission as (RouteRecordName | undefined)[]).includes(item.name)
})  
</script>

<style scoped lang="scss">
.el-menu {
    height: calc(100vh - 60px);
    border: none;
    padding-top: 30px;
    .el-menu-item.is-active {
        background: #e6f7ff;
        border-right: 3px solid #1890ff;
    }
}
</style>