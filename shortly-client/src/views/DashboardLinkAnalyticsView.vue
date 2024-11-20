<script setup lang="ts">
import '@/components/dashboard/link.css'
// based on the id from the route, fetch the link  analytics data,
// if the id is server-choice, don't use the id but call the analytics data for the server choice.
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { AnalyticsData, LinkData } from '@/types'
import { formatDate } from '@/utils'
import ErrorMessage from '@/components/ToastMessage.vue'
import Topheader from '@/components/dashboard/topheader.vue'
import { BASE_API_URL } from '@/constants'
// state for holding link data
const error = ref('')
const linkAndAnalytics = ref<{ link: LinkData; analytics: AnalyticsData[] } | null>(null)
// fetch the link from the server
async function fetchLinkAnalytics() {
  try {
    const route = useRoute()
    const id = route.params.id
    const response = await fetch(`/api/links/${id}/analytics`)
    if (!response.ok) {
      throw new Error('Failed to fetch link')
    }
    const data = await response.json()
    linkAndAnalytics.value = data.linkDataAndAnalytics
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  }
}

// on mount fetch the link  and analytics data use fake data for now
onMounted(() => {
  fetchLinkAnalytics()
})
</script>
<template>
  <section class="container bg-images" style="min-height: 100vh">
    <ErrorMessage :message="error" :show="error.length > 0" />
    <Topheader
      title="Link Analytics"
      paragraph="View Critical Analytics data for your link"
      btnType="back-button"
    />
    <template v-if="linkAndAnalytics !== null" class="analytics-container">
      <div class="link-details">
        <div class="link-info">
          <h3>Original URL</h3>
          <a :href="linkAndAnalytics.link.originalUrl">{{ linkAndAnalytics.link?.originalUrl }}</a>
        </div>
        <div class="link-info">
          <h3>Short URL</h3>
          <a :href="linkAndAnalytics.link.shortUrl">{{ linkAndAnalytics.link?.shortUrl }}</a>
        </div>
        <div class="link-info">
          <h3>Created At</h3>
          <p>{{ formatDate(linkAndAnalytics.link?.createdAt) }}</p>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>IP Address</th>
              <th>User Agent</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(analytics, index) in linkAndAnalytics.analytics" :key="analytics.id">
              <td>{{ index + 1 }}</td>
              <td>{{ analytics.ipAddress }}</td>
              <td>{{ analytics.userAgent }}</td>
              <td>{{ formatDate(analytics.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else-if="linkAndAnalytics === null && error.length === 0">
      <p class="loading-state">Loading...</p>
    </template>
  </section>
</template>
<style lang="css" scoped>
.table-container {
  margin-top: calc(8 * var(--base-size));
  td {
    opacity: 0.65;
    font-weight: 300;
    font-size: 15px;
  }
}
</style>
