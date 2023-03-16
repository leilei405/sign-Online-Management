<template>
    <div>
        <el-descriptions border direction="vertical" :column="9">
            <el-descriptions-item label="月份">{{ month }}月</el-descriptions-item>
            <el-descriptions-item label="正常出勤">0</el-descriptions-item>
            <el-descriptions-item label="正常出勤">0</el-descriptions-item>
            <el-descriptions-item label="正常出勤">0</el-descriptions-item>
            <el-descriptions-item label="正常出勤">0</el-descriptions-item>
            <el-descriptions-item label="正常出勤">0</el-descriptions-item>
            <el-descriptions-item label="正常出勤">0</el-descriptions-item>
            <el-descriptions-item label="操作">
                <el-button type="primary" plain size="small">查看详情</el-button>
            </el-descriptions-item>
            <el-descriptions-item label="考勤状态">
                <el-button type="danger" plain size="small">异常</el-button>
            </el-descriptions-item>
        </el-descriptions>
        <el-calendar v-model="date">
            <template #header>
                <el-button type="primary" size="small">在线签到</el-button>
                <el-space>
                    <el-button plain>{{ year }}年</el-button>
                    <el-select v-model="month">
                        <el-option v-for="item in 12" :value="item" :key="item" :label="item + '月'" />
                    </el-select>
                </el-space>
            </template>
        </el-calendar>
    </div>
    
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
defineComponent({
    name: "SignView",
})
const date = ref(new Date());
const year = date.value.getFullYear();
const month = ref(date.value.getMonth() + 1)
</script>

<style scoped lang="scss">
.el-descriptions {
    margin: 10px;
}
.el-select {
    width: 80px;
}
</style>