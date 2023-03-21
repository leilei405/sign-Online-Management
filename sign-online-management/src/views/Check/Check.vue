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
            <el-table :data="pageCheckList" border style="width: 100%">
                <el-table-column prop="applicantname" label="申请人" width="180" />
                <el-table-column prop="reason" label="审批事由" width="180" />
                <el-table-column prop="time" label="时间">
                    <template #default="scope">
                        {{ scope.row.time.join("-") }}
                    </template>
                </el-table-column>
                <el-table-column prop="note" label="备注" />
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button type="success" @click="handlePutApply(scope.row._id, '已通过')" icon="check" size="small" circle></el-button>
                        <el-button type="danger" @click="handlePutApply(scope.row._id, '未通过')" icon="close" size="small" circle></el-button>
                    </template>
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
import { ElMessage } from 'element-plus';
defineComponent({
    name: "CheckView",
})
const store = useStore();
const usersInfos = computed(() => store.state.users.infos);
const defaultType = '全部';
const approverType = ref(defaultType);
const searchWord = ref(''); // TODO  搜索关键词
const total = computed(() => store.state.checks.checkList.length); // 总条数
const pageSize = ref(6);  // TODO 每页多少条
const pageCurrent = ref(1);  // 当前页
const checkList = computed(() => store.state.checks.checkList);
const checksCheckList = computed(() => store.state.checks.checkList.filter((item) => (
    item.state === approverType.value || defaultType === approverType.value
    ) && (item.note as string).includes(searchWord.value)
))
// 分页自动计算功能
const pageCheckList = computed(()=> checksCheckList.value.slice((pageCurrent.value - 1) * pageSize.value, pageCurrent.value * pageSize.value))
console.log(checkList.value);
// 点击分页数据
const handleChange = (value: number) => {
    pageCurrent.value = value;
}

const handleToCheck = () => {
    console.log('1');
}

const handlePutApply = (_id: string, state: '已通过' | '未通过') => {
    store.dispatch('checks/putCheck', { _id, state }).then((res) => {
        if (+res.errcode === 0) {
            store.dispatch('checks/getApplyList', { approverid: usersInfos.value._id }).then((res) => {
              if (+res.errcode === 0) {
                store.commit('checks/updateCheckList', res.rets);
              } else {
                ElMessage.error(res.errmsg || '审批页信息获取失败')
              }
            })
            ElMessage.success('更新成功');
        } else {
            ElMessage.success('更新失败');
        }
    })
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
.el-pagination {
    float: right;
    margin: 15px;
}
</style>