<template>
    <div>
        <h1>Login</h1>
    </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import http from '../../utils/http';

defineComponent({
    name: "LoginView",
})

http.post('users/login', {
    "email": "huangrong@imooc.com",
    "pass": "huangrong"
}).then((res) => {
    console.log(res, "login");
    
})

</script>

<style scoped lang="scss">

</style>