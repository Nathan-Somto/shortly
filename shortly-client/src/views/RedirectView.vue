<script lang="ts" setup>
import { BASE_API_URL } from '@/constants'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const $route = useRoute()
const error = ref(false)
const shortUrl = $route.params.shortUrl
const redirectLink = async () => {
  try {
    const response = await fetch(`/api/${shortUrl}`)
    if (!response.ok) {
      throw new Error('Link Not Found')
    }
    const data = await response.json()
    window.location.href = data.redirectUrl
  } catch (err) {
    console.error(err)
    error.value = true
  }
}
onMounted(() => {
  redirectLink()
})
</script>
<template>
  <main class="container center-container">
    <template v-if="!error">
      <h3 class="redirect-text text-gradient">Redirecting...</h3>
    </template>
    <template v-else>
      <div>
        <h2 class="eyes-text">👀</h2>
        <h3 class="not-found-text">Link Not Found</h3>
      </div>
    </template>
  </main>
</template>
<style lang="css" scoped>
.center-container {
  display: grid;
  place-items: center;
  height: 100vh;
  text-align: center;
  font-size: 3.5rem;
}
.redirect-text {
  animation: moving-gradient 5s ease-in infinite alternate;
  background-position: 0% 50%;
  background-size: 250% 200%;
}
@keyframes moving-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.not-found-text {
  color: rgba(201, 206, 214, 0.477);
}
.eyes-text {
  font-size: 5.6rem;
  margin-bottom: calc(1.5 * var(--base-size));
}
</style>
