<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './sidebar.vue';
</script>

<template>
    <Sidebar/>
    <main class="dashboard-main">
        <RouterView/>
    </main>
</template>

<style lang="css" scoped>
.dashboard-main {
  margin-left: 250px;
  padding: 20px;
  max-width: 1024px;
  min-height: 100vh;
 /*  width: calc(100vw - 250px); */
}
</style>