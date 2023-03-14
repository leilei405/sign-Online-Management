<template>
    <div>
        主页
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
defineComponent({
    name: "HomeView",
})
</script>

<style scoped lang="scss">

</style>