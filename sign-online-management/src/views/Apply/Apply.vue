<template>
    <div>
        <div class="apply-title">
            <el-button type="primary" @click="handleToApply">添加审批</el-button>
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
        <el-dialog
            v-model="dialogVisible"
            title="添加审批"
            width="500px"
            :before-close="handleClose"
        >
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="80px"
            >
                <el-form-item label="审批人" prop="approvername">
                    <el-select   v-model="ruleForm.approvername" type="text" placeholder="请选择">
                        <el-option v-for="value in approver" :key="value._id" :value="value.name" :lable="value.name" />
                    </el-select>
                </el-form-item>
                <el-form-item label="审批事由" prop="reason">
                    <el-select v-model="ruleForm.reason"  placeholder="请选择">
                        <el-option value="年假" lable="年假" />
                        <el-option value="事假" lable="事假" />
                        <el-option value="病假" lable="病假" />
                        <el-option value="外出" lable="外出" />
                        <el-option value="补签卡" lable="补签卡" />
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="time">
                    <el-date-picker
                        v-model="ruleForm.time"
                        type="datetimerange"
                        range-separator="——"
                        start-placeholder="起始日期"
                        end-placeholder="结束日期"
                    />
                </el-form-item>
                <el-form-item label="时间" prop="note">
                    <el-input type="textarea" placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="reset(ruleFormRef)" class="btnLogin" plain auto-insert-space>重置</el-button>
                <el-button @click="submitForm(ruleFormRef)" class="btnLogin" type="primary" auto-insert-space>确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { defineComponent, computed, reactive, ref } from 'vue';
import { useStore} from '../../store';
import { FormInstance, FormRules, DateModelType } from 'element-plus'
defineComponent({
    name: "ApplyView",
})
const store = useStore();
const defaultType = '全部';
const approverType = ref(defaultType);
const searchWord = ref(''); // TODO  搜索关键词
const dialogVisible = ref(false);  // 对话框初始值  隐藏\
// 获取审批人
const usersInfo = computed(() => store.state.users.infos);
const approver = computed(() => usersInfo.value.approver as {[index: string]: unknown});
console.log(approver.value);

// 审批状态筛选功能
const checksApplyList = computed(() => store.state.checks.applyList.filter((item) => (
    item.state === approverType.value || defaultType === approverType.value
    ) && (item.note as string).includes(searchWord.value)
))
const total = computed(() => store.state.checks.applyList.length); // 总条数
const pageSize = ref(6);  // TODO 每页多少条
const pageCurrent = ref(1);  // 当前页
// 分页自动计算功能
const pageCheckList = computed(()=> checksApplyList.value.slice((pageCurrent.value - 1) * pageSize.value, pageCurrent.value * pageSize.value))

// 取消
const handleClose = () => {
    !dialogVisible.value
}
// 添加审批
const handleToApply = () => {
    dialogVisible.value = true;
}
// 点击分页数据
const handleChange = (value: number) => {
    pageCurrent.value = value;
}

// 表单实例
const ruleFormRef = ref<FormInstance>()

interface ApplyList {
    applicantname: string,   
    approverid: string,      
    approvername: string,    
    note: string,            
    reason: string,          
    time: [DateModelType, DateModelType],            
}

// 所需收集的字段
const ruleForm = reactive<ApplyList>({
    applicantname: '',   // 申请人姓名
    approverid: '',      // 审批人ID
    approvername: '',    // 审批人姓名
    note: '',            // 审批备注
    reason: '',          // 审批事由
    time: ['', ''],            // 审批时间
})

// 表单校验规则
const rules = reactive<FormRules>({
    approvername: [
        { required: true, message: '请选择审批人', trigger: 'blur' },
    ],
    reason: [
        { required: true, message: '请选择审批事由', trigger: 'blur' }
    ],
    time: [
        { required: true, message: '请选择时间', trigger: 'blur' }
    ],
    note: [
        { required: true, message: '请输入备注', trigger: 'blur' }
    ]
})

// 点击提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
        console.log('大部分是否不打算', ruleForm);
    } else {
        console.log('error submit');
        return false;
    }
  })
}

// 重置
const reset = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
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