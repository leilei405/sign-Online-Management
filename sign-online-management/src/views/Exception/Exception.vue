<template>
    <div>
        <div class="exception-title">
            <el-button type="primary" @click="handleToApply">异常处理</el-button>
            <el-space>
                <el-button plain>{{ year }}年</el-button>
                <el-select v-model="month">
                    <el-option v-for="item in 12" :value="item" :key="item" :label="item + '月'" />
                </el-select>
            </el-space>
        </div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-empty v-if="arrStatus.length === 0" description="暂无异常考勤" />
                <el-timeline v-else>
                    <el-timeline-item v-for="item in arrStatus" :key="item[0]" :timestamp=" year + '/' + month + '/' + item[0]" placement="top">
                        <el-card>
                            <h4>{{ item[1] }}</h4>
                            <p class="exceptInfo">考勤详情：{{ renderTime(item[0]) }}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
                
            </el-col>
            <el-col :span="12">
                <el-empty v-if="applyListMonth.length === 0" description="暂无申请审批" />
                <el-timeline v-else>
                    <el-timeline-item v-for="(item) in applyListMonth" :key="item._id" :timestamp="item.reason" placement="top">
                        <el-card>
                            <h4>{{ item.state }}</h4>
                            <p class="exceptInfo">申请日期：{{ item.time[0] }}-{{ item.time[1] }}</p>
                            <p class="exceptInfo">申请详情：{{ item.note }}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
    </div>
    
</template>

<script setup lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore} from '../../store';
import { toZero } from '../../utils/common';
defineComponent({
    name: "ExceptionView",
})
const route = useRoute();
const router = useRouter();
const date = new Date();
const year = date.getFullYear();
const month = ref(Number(route.query.month) || date.getMonth() + 1);
const store = useStore();
const signsInfos = computed(() => store.state.signs.infos);  // 考勤信息
//  审批信息列表
const applyListMonth = computed(() => store.state.checks.applyList.filter((item) => {
    const startTime = (item.time as string[])[0].split(' ')[0].split('-');
    const endTime = (item.time as string[])[1].split(' ')[0].split('-');
    return startTime[1] <= toZero(month.value) && endTime[1] >= toZero(month.value)
}))

const ret = ((signsInfos.value.detail as {[index: string]: unknown} )[toZero(month.value)] as {[index: string]: unknown});  // 考勤状态  旷工  迟到  正常

// 将ret转为数组？  Object.entries
const arrStatus = computed(() => 
    Object.entries(ret).filter((item) => item[1] !== "正常出勤").sort()
);

const renderTime = (day: string) => {
    const time = ((signsInfos.value.time as {[index: string]: unknown} )[toZero(month.value)] as {[index: string]: unknown})[day];
    if (Array.isArray(time)) {
        return time.join('-');
    } else {
        return '暂无打卡记录';
    }
}

watch (month, () => {
    router.push({
        query: { month: month.value }
    })
})

const handleToApply = () => {
    router.push('/apply');
}

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