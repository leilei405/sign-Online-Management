<template>
    <div>
        <div class="exception-title">
            <el-button type="primary">异常处理</el-button>
            <el-space>
                <el-button plain>{{ year }}年</el-button>
                <el-select v-model="month">
                    <el-option v-for="item in 12" :value="item" :key="item" :label="item + '月'" />
                </el-select>
            </el-space>
        </div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-empty v-if="false" description="暂无异常考勤" />
                <el-timeline v-else>
                    <el-timeline-item v-for="(activity, index) in activities" :key="index" timestamp="考勤异常详情" placement="top">
                        <el-card>
                            <h4>旷工</h4>
                            <p class="exceptInfo">考勤详情：暂无打卡记录</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
                
            </el-col>
            <el-col :span="12">
                <el-empty v-if="false" description="暂无申请审批" />
                <el-timeline v-else>
                    <el-timeline-item v-for="(activity, index) in activities" :key="index" timestamp="事假" placement="top">
                        <el-card>
                            <h4>已通过</h4>
                            <p class="exceptInfo">申请日期：</p>
                            <p class="exceptInfo">申请详情：</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
    </div>
    
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
defineComponent({
    name: "ExceptionView",
})
const date = new Date();
const year = date.getFullYear();
const month = ref(date.getMonth() + 1);

const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
]
</script>

<style scoped lang="scss">
.exception-title {
    margin: 20px;
    display: flex;
    justify-content: space-between;
}
.el-select {
    width:80px;
}
.el-timeline {
    margin: 10px;
}
.exceptInfo {
    margin: 10px;
}
</style>