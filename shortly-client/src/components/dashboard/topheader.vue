<script setup lang="ts">
import Newlinkdialog from './newlinkdialog.vue';

const {btnType, paragraph, title} = defineProps<{
    title: string
    paragraph: string
    btnType: "new-link" | "back-button"
}>()
</script>
<template>
  <header class="top-header">
      <div>
        <h1>{{title}}</h1>
        <p>{{paragraph}}</p>
      </div>
      <template v-if="btnType === 'new-link'">
        <Newlinkdialog />
    </template>
    <template v-else-if="btnType === 'back-button'">
      <RouterLink to="/dashboard/link-history" class="btn btn-secondary">
        <span class="icon">&#8592;</span> Back to Link History
      </RouterLink>
    </template>
  </header>
</template>
