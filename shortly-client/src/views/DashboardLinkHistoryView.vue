<script lang="ts" setup>
import Newlinkdialog from '@/components/dashboard/newlinkdialog.vue'
import { ref, onMounted } from 'vue'
import type { LinkData } from '@/types'
import { formatDate } from '@/utils'
import ErrorMessage from '@/components/ToastMessage.vue'
import Topheader from '@/components/dashboard/topheader.vue'
// state for holding link data
const error = ref('')
const links = ref<LinkData[]>([])
// fetch the links from the server
async function fetchLinks() {
  try {
    const response = await fetch(`/api/links/history`, { credentials: 'include' })
    if (!response.ok) {
      throw new Error('Failed to fetch links')
    }
    const data = await response.json()
    console.log('the data: ', data)
    links.value = data?.linkHistory
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  }
}
// on mount for now populate with fake data
onMounted(async () => {
  await fetchLinks()
})
</script>
<template>
  <section class="container bg-images" style="height: 100vh">
    <ErrorMessage :message="error" :show="error.length > 0" />
    <Topheader
      btn-type="new-link"
      title="Link History"
      paragraph="Here's a history of all the links you've shortened."
    />
    <div v-if="links.length === 0">
      <p>No links yet. Shorten a link to get started.</p>
    </div>
    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Short Link</th>
            <th>Original Link</th>
            <th>Qr Code</th>
            <th>Clicks</th>
            <th>Created At</th>
            <th>Analytics</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in links" :key="link.id">
            <td>
              <RouterLink :to="'/' + link.shortUrl" target="_blank">{{ link.shortUrl }}</RouterLink>
            </td>
            <td>{{ link.originalUrl }}</td>
            <td><img :src="link.qrCode" alt="QR Code" class="qr-image" /></td>
            <td>{{ link.clicks }}</td>
            <td>{{ formatDate(link.createdAt) }}</td>
            <td><RouterLink :to="`analytics/${link.id}`">View</RouterLink></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
