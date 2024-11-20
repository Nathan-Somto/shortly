<script setup lang="ts">
import '@/assets/auth.css'
import ToastMessage from '@/components/ToastMessage.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const store = useUserStore()
const isLoading = ref(false)
const email = ref('')
const password = ref('')
const error = ref('')
const $router = useRouter()
async function onSubmit() {
  isLoading.value = true
  try {
    const isSuccess = await store.loginUser(email.value, password.value)
    if (isSuccess) {
      $router.push({ name: 'dashboard-home' })
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
      error.value = err.message
    }
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <main class="container auth-container">
    <ToastMessage :show="error.length > 0" :message="error" />
    <section class="auth-section">
      <h2 class="heading text-gradient">Login to Shortly</h2>
      <p class="subtitle">Don't have an Account? <a href="/signup">Sign Up</a></p>
      <form @submit="onSubmit" @submit.prevent class="auth-form">
        <div class="form-group">
          <label class="form-label"> Email </label>
          <input name="email" class="form-input" v-model="email" type="email" required />
        </div>
        <div class="form-group">
          <label class="form-label"> Password </label>
          <input name="password" type="password" v-model="password" class="form-input" required />
        </div>
        <button type="submit" class="btn" :disabled="isLoading">
          {{ isLoading ? 'Processing...' : 'Login' }}
        </button>
      </form>
    </section>
  </main>
</template>
