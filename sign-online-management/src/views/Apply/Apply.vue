<template>
    <div>
        <div class="apply-title">
            <el-button type="primary" @click="handleToApply">异常处理</el-button>
            <el-space>
                <el-input v-model="searchWord" placeholder="请输入搜索关键词" />
                <el-button type="primary" @click="handleToApply" :icon="Search">搜索</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-radio-group v-model="approverType">
                    <el-radio-button label="全部" />
                    <el-radio-button label="待审批" />
                    <el-radio-button label="已通过" />
                    <el-radio-button label="未通过" />
                </el-radio-group>
            </el-space>
        </div>
        <div class="apply-table">
            <el-table :data="pageCheckList" border style="width: 100%">
                <el-table-column prop="applicantname" label="申请人" width="180" />
                <el-table-column prop="reason" label="审批事由" width="180" />
                <el-table-column prop="time" label="时间">
                    <template #default="scope">
                        {{ scope.row.time.join("-") }}
                    </template>
                </el-table-column>
                <el-table-column prop="note" label="备注" />
                <el-table-column prop="approvername" label="审批人" width="180" />
                <el-table-column prop="state" label="状态" width="180" />
            </el-table>
            <el-pagination small :page-size="pageSize" background @current-change="handleChange" layout="prev, pager, next" :total="total" />
        </div>
       
    </div>
    
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { defineComponent, ref, computed } from 'vue';
import { useStore} from '@/store';
defineComponent({
    name: "ApplyView",
})
const store = useStore();
const defaultType = '全部';
const approverType = ref(defaultType);
const searchWord = ref(''); // TODO  搜索关键词
const checksApplyList = computed(() => store.state.checks.applyList.filter((item) => (
    item.state === approverType.value || defaultType === approverType.value
    ) && (item.note as string).includes(searchWord.value)
))
const total = computed(() => store.state.checks.applyList.length);
const pageSize = ref(6);
const pageCurrent = ref(1);
console.log(checksApplyList.value, '-----------------');

const pageCheckList = computed(()=> checksApplyList.value.slice((pageCurrent.value - 1) * pageSize.value, pageCurrent.value * pageSize.value))


// 审批状态筛选功能



// 点击分页数据
const handleChange = (value: number) => {
    pageCurrent.value = value;
}

// 添加审批
const handleToApply = () => {
    console.log(1);
}
</script>

<style scoped lang="scss">
.apply-title {
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.apply-table {
    margin: 10px;
}
.el-pagination {
    float: right;
    margin: 10px;
}
</style>