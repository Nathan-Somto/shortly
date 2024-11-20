<script lang="ts" setup>
import Topheader from '@/components/dashboard/topheader.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import ToastMessage from '@/components/ToastMessage.vue'
type UserStats = {
  totalClicks: number
  linksCreated: number
}
const userStats = ref<UserStats | null>(null)
const error = ref('')
const store = useUserStore()
// fetch user stats
async function fetchUserStats() {
  try {
    const response = await fetch(`/api/users/stats`, { credentials: 'include' })
    if (!response.ok) {
      throw new Error('Failed to fetch user stats')
    }
    const data = await response.json()
    userStats.value = data.userStats
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  }
}
onMounted(() => {
  fetchUserStats()
})
</script>

<template>
  <section class="container bg-images" style="min-height: 100vh">
    <ToastMessage :message="error" :show="error.length > 0" />
    <Topheader
      btn-type="new-link"
      :title="`Welcome 👋 ${store.user?.firstName} ${store.user?.lastName} `"
      paragraph="Here's a quick overview of your Shortly stats:"
    />
    <div class="stats" v-if="userStats !== null">
      <div class="stat">
        <h2>Total Clicks</h2>
        <p>{{ userStats.totalClicks ?? 0 }}</p>
      </div>
      <div class="stat">
        <h2>Links Created</h2>
        <p>{{ userStats.linksCreated }}</p>
      </div>
    </div>
    <div v-if="error.length === 0 && userStats === null">
      <p class="loading-state">Loading...</p>
    </div>
  </section>
</template>

<style scoped>
/* Stats Grid Styles */
.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;
}

/* Individual Stat Card Styles */
.stat {
  background-color: var(--brand-grey);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 10px;
    opacity: 0.8;
  }

  p {
    font-size: 1.2rem;
    font-weight: 700;
    color: #34495e;
  }
}
</style>
