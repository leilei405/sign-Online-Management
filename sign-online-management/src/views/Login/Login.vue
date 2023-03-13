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
                <el-button class="btnLogin" type="primary" @click="submitForm(ruleFormRef)" auto-insert-space>登录</el-button>
            </el-form-item>
        </el-form>
        <!-- 测试账号区域 -->
        <div class="usersTest">
            <el-row :gutter="20">
                <el-col :span="12" v-for="item in testUser" :key="item.email">
                    <h3>
                        <div>测试账号{{ i++ }}</div>
                        <el-button type="primary" @click="testLogin({email: item.email, pass: item.pass})">一键登录</el-button></h3>
                    <p>邮箱：{{ item.email }}</p>
                    <p>密码：{{ item.pass }}</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// import { useStore } from  '../../store/index
defineComponent({
    name: "LoginView",
})
// 测试账号序列
let i = 1;

// 定义类型 email pass
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
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ],
    pass: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})

// 点击登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', ruleForm)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// 测试登录账号信息
const testUser: User[] = [
    {
        email: 'huangrong@imooc.com',
        pass: 'huangrong'
    },
    {
        email: 'hongqigong@imooc.com',
        pass: 'hongqigong'
    },
]

// 测试账号点击登录事件
const testLogin = (user: User) => {
    ruleForm.email = user.email;
    ruleForm.pass = user.pass;
    submitForm(ruleFormRef.value)
}

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
    .btnLogin {
        width: 100%;
    }
    .usersTest { 
        width: 500px;
        margin: 60px auto;
        color: rgba(0, 0, 0, 0.5)
    }
    h3 {
        font-size: 16px;
    }
    p {
        margin: 20px;
    }
}
</style>