<template>
    <div class="login">
        <div class="header">
            <span class="header-logo">
                <i class="iconfont icon-typescript"></i>
            </span>
            <div class="header-title">在线考勤系统</div>
        </div>
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="main"
        >
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" type="text" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password"  placeholder="请输入密码" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)" auto-insert-space>登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// import { useStore } from  '../../store/index
defineComponent({
    name: "LoginView",
})
// 定义类型
interface User {
    email: string;
    pass: string;
}
// 实例
const ruleFormRef = ref<FormInstance>()
// 所需字段
const ruleForm = reactive<User>({
  pass: '',
  email: ''
})
// 表单校验规则
const rules = reactive<FormRules>({
  
})
// 点击登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', valid)
    } else {
      console.log('error submit!')
      return false
    }
  })
}
// const store = useStore();

// store.dispatch('users/login').then((res) => {
//     console.log(res);
// })

</script>

<style scoped lang="scss">
.login {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/login-bg.svg') no-repeat center 110px;
    background-size: 100%;
    .header {
        height: 44px;
        line-height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 34px;
        padding-top: 100px;
        .header-logo {
            .icon-typescript {
                margin-right: 5px;
                font-size: inherit;
                color: aqua;
            }
        }
        .header-title {
            margin-left: 30px;
            font-weight: 700;
        }
    }
    .main {
         width: 500px;
         margin: 0 auto;
         margin-top: 20px;
    }
    .el-button {
        width: 100%;
    }
}
</style>