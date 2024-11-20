<script setup lang="ts">
import '@/assets/auth.css'
import ToastMessage from '@/components/ToastMessage.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const store = useUserStore()
const isLoading = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const $router = useRouter()
async function onSubmit() {
  isLoading.value = true
  try {
    const isSuccess = await store.signupUser(
      firstName.value,
      lastName.value,
      email.value,
      password.value,
    )
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
  <main class="auth-container">
    <section class="auth-section">
      <ToastMessage :show="error.length > 0" :message="error" />
      <h2 class="heading text-gradient">Create An Account</h2>
      <p class="subtitle">Already have an Account? <a href="/login">Log In</a></p>
      <form @submit="onSubmit" @submit.prevent class="auth-form">
        <div class="form-group-container">
          <div class="form-group">
            <label class="form-label"> First Name </label>
            <input name="firstName" class="form-input" v-model="firstName" />
          </div>
          <div class="form-group">
            <label class="form-label"> Last Name </label>
            <input name="lastName" class="form-input" v-model="lastName" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label"> Email </label>
          <input name="email" class="form-input" v-model="email" />
        </div>
        <div class="form-group">
          <label class="form-label"> Password </label>
          <input name="password" type="password" class="form-input" v-model="password" />
        </div>
        <button type="submit" class="btn" :disabled="isLoading">
          {{ isLoading ? 'Processing...' : 'Sign up' }}
        </button>
      </form>
    </section>
  </main>
</template>
