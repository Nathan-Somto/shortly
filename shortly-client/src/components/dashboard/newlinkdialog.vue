<script setup lang="ts">
import '@/assets/auth.css'
import ErrorMessage from '../ToastMessage.vue'
import { type LinkData } from '@/types'
import { ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const props = defineProps<{
  setLinkData?: (data: LinkData) => void
}>()
const isLoading = ref(false)
const link = ref('')
const showCustomName = ref(false)
const customName = ref('')
const error = ref('')
const dialog = useTemplateRef('dialog')
function openDialog() {
  dialog.value?.showModal()
}
function closeDialog() {
  if (dialog.value) {
    console.log('clicked')
    dialog.value.close()
  }
}
async function shortenLink() {
  if (!link.value) {
    return
  }
  try {
    isLoading.value = true
    // make a post request to the server to shorten the link
    const response = await fetch(`/api/links/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link: link.value,
        customName: showCustomName.value ? customName.value : undefined,
      }),
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error('Failed to shorten the link')
    }
    const data = await response.json()
    props?.setLinkData?.(data.newLink)
    dialog.value?.close()
    if (!props?.setLinkData) {
      $router.push(`/dashboard/link/${data.newLink.id}`)
    }
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <button class="btn" @click="openDialog">Shorten a Link</button>
  <dialog ref="dialog">
    <div class="dialog-content" style="max-width: 480px; width: 100%">
      <button @click="closeDialog" class="dialog-close">X</button>
      <ErrorMessage :be-fixed="false" :message="error" :show="error.length > 0" />
      <h2>Shorten a Link</h2>
      <div class="form-group">
        <label for="link">Link</label>
        <input
          type="text"
          v-model="link"
          class="form-input"
          placeholder="Enter a link to shorten"
        />
      </div>
      <!-- Check box to ask if they want to use a short name or generated id -->
      <div class="checkbox-container">
        <input type="checkbox" id="use-custom-name" v-model="showCustomName" />
        <label for="use-custom-name">Use custom name</label>
      </div>
      <div v-if="showCustomName">
        <div class="form-group">
          <label for="custom-name">Custom Name</label>
          <input
            type="text"
            v-model="customName"
            class="form-input"
            placeholder="Enter a custom name"
          />
        </div>
      </div>
      <div class="btn-container">
        <button class="btn btn-destructive" style="width: 48%" @click="() => dialog?.close()">
          Cancel
        </button>
        <button
          class="btn"
          style="width: 48%"
          @click="shortenLink"
          :disabled="link.length === 0 || isLoading"
        >
          Shorten
        </button>
      </div>
    </div>
  </dialog>
</template>
<style scoped>
.new-link-dialog dialog {
  width: 400px;
  padding: 20px;
  border-radius: 5px;
  background-color: var(--brand-grey);
}
.new-link-dialog h2 {
  margin-bottom: 10px;
}
.new-link-dialog input {
  width: 100%;
  margin-bottom: 10px;
}
.checkbox-container {
  display: flex;
  align-items: center;
  margin: 12px 0;
  input {
    margin-right: 6px;
  }
  label {
    font-size: 14px;
    opacity: 0.7;
  }
}
</style>
