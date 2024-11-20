<script setup lang="ts">
import '@/components/dashboard/link.css'
// get the param id from the route
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { LinkData } from '@/types'
import { formatDate } from '@/utils'
import ToastMessage from '@/components/ToastMessage.vue'
import Topheader from '@/components/dashboard/topheader.vue'
import { BASE_API_URL } from '@/constants'
import Analytics from '@/components/icons/analytics.vue'
// state for holding link data
const error = ref('')
const link = ref<LinkData | null>(null)
// fetch the link from the server
async function fetchLink() {
  try {
    const route = useRoute()
    const id = route.params.id
    const response = await fetch(`/api/links/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch link')
    }
    const data = await response.json()
    link.value = data.link
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  }
}
// on mount fetch the link use fake data for now
onMounted(async () => {
  await fetchLink()
})
</script>
<template>
  <section class="container">
    <ToastMessage :message="error" :show="error.length > 0" />
    <Topheader
      btn-type="back-button"
      title="Link Details"
      paragraph="Here are the details of  your shortened link."
    />

    <div class="qr-card">
      <img :src="link?.qrCode" alt="QR Code" class="qr-code-img" />
      <p class="qr-description">Scan the QR code or share with friends</p>
    </div>

    <template v-if="link !== null">
      <div class="link-details">
        <div class="link-info">
          <h3>Original URL</h3>
          <a :href="link.originalUrl" target="_blank">{{ link?.originalUrl }}</a>
        </div>
        <div class="link-info">
          <h3>Short URL</h3>
          <RouterLink :to="`/${link.shortUrl}`" target="_blank">{{ link?.shortUrl }}</RouterLink>
        </div>
        <div class="link-info">
          <h3>Clicks</h3>
          <p>{{ link?.clicks }}</p>
        </div>
        <div class="link-info">
          <h3>Created At</h3>
          <p>{{ formatDate(link?.createdAt) }}</p>
        </div>
      </div>
      <RouterLink :to="`/dashboard/analytics/${link.id}`" class="btn analytics-btn">
        <Analytics /> View Analytics
      </RouterLink>
    </template>

    <!-- Loading State -->
    <div v-else-if="link === null && error.length === 0" class="loading-state">
      <p>Loading...</p>
    </div>
  </section>
</template>
<style lang="css" scoped>
.analytics-btn {
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.15rem;
  align-items: center;
  display: flex;
  max-width: fit-content;
  font-weight: 500;
  svg {
    margin-right: 0.5rem;
    height: 20px;
    width: 20px;
  }
}
</style>
