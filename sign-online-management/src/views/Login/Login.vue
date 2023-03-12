<template>
    <div>
        <h1>Login</h1>
    </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useStore } from  '../../store/index'
defineComponent({
    name: "LoginView",
})

const store = useStore();

store.dispatch('users/login').then((res) => {
    console.log(res);
})

</script>

<style scoped lang="scss">

</style>