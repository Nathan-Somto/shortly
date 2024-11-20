<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import Loader from './components/loader.vue';
const store = useUserStore()
</script>

<template>
  <template v-if="store.isLoading">
   <Loader/>
  </template>
  <template v-else>
  <RouterView />
  </template>
</template>

<style scoped></style>
