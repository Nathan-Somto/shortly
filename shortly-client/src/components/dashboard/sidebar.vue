<style lang="css" scoped>
.sidebar {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid var(--brand-grey);
  height: 100dvh;
  background-color: var(--brand-black);
  z-index: 5;
}
.logo {
  text-align: center;
  margin-bottom: 20px;
}

.logo-img {
  width: 100px;
  height: auto;
  margin-top: 0.75rem;
  margin-left: 0.25rem;
}

.sidebar-links ul {
  padding: 0;
  margin: 0;
}

.sidebar-links li {
  margin-bottom: 15px;
}

.sidebar-links a {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.sidebar-links a:hover {
  background-color: var(--brand-grey);
}

.sidebar-links a .icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.sidebar-links .active {
  background-color: var(--brand-grey);
  color: var(--brand-blue);
}

.logout-btn {
  /* shuld be at the bottom of side bar */
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>
<template>
  <ToastMessage :show="error.length > 0" :message="error" variant="error" />
  <aside class="sidebar">
    <div class="logo">
      <a href="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      </a>
    </div>

    <nav class="sidebar-links">
      <ul>
        <li>
          <RouterLink to="/dashboard" exact-active-class="active">
            <Home />
            <span>Home</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/dashboard/qr-codes" exact-active-class="active">
            <Qrcodes />
            <span>QR Codes</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/dashboard/link-history" exact-active-class="active">
            <History />
            <span>Link History</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/dashboard/analytics/latest" exact-active-class="active">
            <Analytics />
            <span>Analytics</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <button class="logout-btn btn btn-destructive" @click="logout" :disabled="isLoading">
      Logout
    </button>
  </aside>
</template>
<script setup lang="tsx">
import { ref } from 'vue'
import Analytics from '../icons/analytics.vue'
import History from '../icons/history.vue'
import Home from '../icons/home.vue'
import Qrcodes from '../icons/qrcodes.vue'
import { useUserStore } from '@/stores/user'
import ToastMessage from '../ToastMessage.vue'
const isLoading = ref(false)
const error = ref('')
const store = useUserStore()
const logout = async () => {
  isLoading.value = true
  try {
    const res = await store.logoutUser()
    if (res) {
      window.location.href = '/login'
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
