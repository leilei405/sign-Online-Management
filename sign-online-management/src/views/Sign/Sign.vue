<template>
    <div>
        <el-descriptions border direction="vertical" :column="9">
            <el-descriptions-item label="月份">{{ month }}月</el-descriptions-item>
            <el-descriptions-item v-for="value, key in DetailKey" :key="key" :label="value">
                {{ detailValue[key] }}
            </el-descriptions-item>
            <el-descriptions-item label="操作">
                <el-button type="primary" plain size="small" @click="handleException">查看详情</el-button>
            </el-descriptions-item>
            <el-descriptions-item label="考勤状态">
                <el-button :type="detailState.type" plain size="small">{{ detailState.text }}</el-button>
            </el-descriptions-item>
        </el-descriptions>
        <el-calendar v-model="date">
            <template #header>
                <el-button type="primary" size="small" @click="handleSignsOnline">在线签到</el-button>
                <el-space>
                    <el-button plain>{{ year }}年</el-button>
                    <el-select v-model="month" @change="handleChange">
                        <el-option v-for="item in 12" :value="item" :key="item" :label="item + '月'" />
                    </el-select>
                </el-space>
            </template>
            <template #dateCell="{ data }">
                <div>{{ renderDate(data.day) }}</div>
                <div class="showTime">{{ renderTime(data.day) }}</div>
            </template>
        </el-calendar>
    </div>
    
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store';
const router = useRouter();
const store = useStore();

// 跳转异常页
const  handleException = () => {
    router.push('/exception');
}

defineComponent({
    name: "SignView",
})

const date = ref(new Date());
const year = date.value.getFullYear();
const month = ref(date.value.getMonth() + 1)
 
// 出勤状态 枚举实现
enum DetailKey {
    normal = '正常出勤',
    absent = '旷工',
    miss = '漏打卡',
    late = '迟到',
    early = '早退',
    lateAndEarly = '迟到并早退'
}

// 次数
const detailValue = reactive({
    normal: 0,
    absent: 0,
    miss: 0,
    late: 0,
    early: 0,
    lateAndEarly: 0
})

// 考勤异常状态
const detailState = reactive({
    type: 'success' as 'success' | 'danger',
    text: '正常' as '正常' | '异常'
})

const signsInfos = computed(() => store.state.signs.infos)
const usersInfos = computed(() => store.state.users.infos)

// 签到状态
const renderDate = (day: string) => {
    return day.split('-')[2]
}

// 时间
const renderTime = (day: string) => {
    const [ year, month, date ] = day.split('-');
    const ret = ((signsInfos.value.time as {
        [index: string]: unknown
    })[month] as {
        [index: string]: unknown
    })[date];
    if (Array.isArray(ret)) {
        return ret.join('-')
    }
}

// 在线签到打卡
const handleSignsOnline = () => {
    store.dispatch('signs/putTime', {
        userid: usersInfos.value._id
    }).then((res) => {
        if(+res.errcode === 0) {
            store.commit('signs/updateInfos', res.infos);
            ElMessage.success('签到打卡成功');
        }
    })
}

// 点击月份切换动态日历   没太懂 回头再看一下
const handleChange = () => {
    date.value = new Date(`${year}-${month.value}`)
}


</script>

<style scoped lang="scss">
.el-descriptions {
    margin: 10px;
}
.el-select {
    width: 80px;
}
.showTime {
    text-align: center;
    line-height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>