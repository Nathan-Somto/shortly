<script setup lang="ts">
// state to hold qr codes and short links
import { ref, onMounted } from 'vue'
import type { QrCodeData } from '@/types'
import { formatDate } from '@/utils'
import ToastMessage from '@/components/ToastMessage.vue'
import Newlinkdialog from '@/components/dashboard/newlinkdialog.vue'
import { RouterLink } from 'vue-router'
import Topheader from '@/components/dashboard/topheader.vue'
import { BASE_API_URL } from '@/constants'
// state for holding qr codes
const variant = ref<'error' | 'success'>('error')
const message = ref('')
const qrCodes = ref<QrCodeData[]>([])
// fetch the qr codes from the server
async function fetchQrCodes() {
  try {
    const response = await fetch(`/api/links/qr-codes`)
    if (!response.ok) {
      throw new Error('Failed to fetch qr codes')
    }
    const data = await response.json()
    console.log('the data:', data)
    qrCodes.value = data.qrCodes
  } catch (err) {
    if (err instanceof Error) {
      variant.value = 'error'
      message.value = err.message
    }
  }
}
// handle copy of the qr code
function handleCopyQrCode(image: string) {
  // copy the qr code to the clipboard
  navigator.clipboard
    .writeText(image)
    .then(() => {
      variant.value = 'success'
      message.value = 'Copied to clipboard'
      console.log('Copied to clipboard')
    })
    .catch((err) => {
      variant.value = 'error'
      message.value = 'Failed to copy to clipboard'
      console.error('Failed to copy to clipboard', err)
    })
}
// on mount for now populate with fake data
onMounted(() => {
  fetchQrCodes()
})
</script>
<template>
  <section class="container bg-images" style="min-height: 100vh">
    <ToastMessage :message="message" :variant="variant" :show="message.length > 0" />
    <Topheader
      btn-type="new-link"
      title="QR Codes"
      paragraph="Here's a quick overview of your QR Codes:"
    />
    <div v-if="qrCodes.length === 0">
      <p>No qr codes yet. Create a qr code to get started.</p>
    </div>
    <div v-else class="grid-container">
      <RouterLink
        class="card"
        v-for="qrCode in qrCodes"
        :to="`/dashboard/link/${qrCode.id}`"
        :key="qrCode.id"
      >
        <div class="card-header">
          <button
            class="btn"
            @click="
              (e) => {
                e.preventDefault()
                handleCopyQrCode(qrCode.qrCode)
              }
            "
          >
            Copy
          </button>
          <button class="btn btn-destructive">Delete</button>
        </div>
        <div class="card-body">
          <img :src="qrCode.qrCode" alt="QR Code" />
        </div>
        <div class="card-footer">
          <p>{{ formatDate(qrCode.createdAt) }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
<style scoped>
.top-header {
  margin-bottom: 30px;
}
h2 {
  opacity: 0.75;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: calc(5.5 * var(--base-size));
}
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--brand-grey);
  border-radius: calc(1.5 * var(--base-size));
  overflow: hidden;
  img {
    width: 70%;
    height: auto;
  }
}
.card-header {
  padding: calc(0.5rem + var(--base-size));
  display: flex;
  justify-content: flex-end;
  margin-bottom: calc(2.5 * var(--base-size));
  gap: calc(1.5 * var(--base-size));
  button {
    font-size: 14px;
    padding: 0.5rem 0.85rem;
  }
}
.card-body {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--base-size);
}
.card-footer {
  padding: var(--base-size);
  background-color: var(--brand-grey);
  color: var(--brand-lite);
  margin-top: calc(1.5 * var(--base-size));
  p {
    margin: 0;
    opacity: 0.75;
    font-size: 13.5px;
  }
}
</style>
