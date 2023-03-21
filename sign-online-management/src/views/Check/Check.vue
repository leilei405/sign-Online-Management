<template>
    <div>
        <div class="check-title">
            <el-space>
                <el-input v-model="searchWord" placeholder="请输入搜索关键词" />
                <el-button type="primary" @click="handleToCheck" :icon="Search">搜索</el-button>
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
            <el-table :data="checkList" border style="width: 100%">
                <el-table-column prop="applicantname" label="申请人" width="180" />
                <el-table-column prop="reason" label="审批事由" width="180" />
                <el-table-column prop="time" label="时间">
                    <template #default="scope">
                        {{ scope.row.time.join("-") }}
                    </template>
                </el-table-column>
                <el-table-column prop="note" label="备注" />
                <el-table-column label="操作" width="180">
                    <!-- <template #default="scope">
                        <el-icon><CircleCheck style=""/>{{ scope }}</el-icon>
                        <el-icon><CircleClose /></el-icon>
                    </template> -->
                </el-table-column>
                <el-table-column prop="state" label="状态" width="180" />
            </el-table>
            <el-pagination small :page-size="pageSize" background @current-change="handleChange" layout="prev, pager, next" :total="total" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore} from '../../store';
import { Search } from '@element-plus/icons-vue';
defineComponent({
    name: "CheckView",
})
const store = useStore();
const defaultType = '全部';
const approverType = ref(defaultType);
const searchWord = ref(''); // TODO  搜索关键词
const total = computed(() => store.state.checks.checkList.length); // 总条数
const pageSize = ref(6);  // TODO 每页多少条
const pageCurrent = ref(1);  // 当前页
const checkList = computed(() => store.state.checks.checkList);

console.log(checkList.value);

// 点击分页数据
const handleChange = (value: number) => {
    pageCurrent.value = value;
}

const handleToCheck = () => {
    console.log('1');
}
</script>

<style scoped lang="scss">
.check-title {
    margin: 20px;
    display: flex;
    justify-content: end;
    align-items: center;
}
.apply-table {
    margin: 10px;
}
</style>