<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const store = useUserStore()
console.log('user: ', store.user)
</script>

<template>
  <nav class="home-nav">
    <h2 class="text-gradient">Shortly</h2>
    <ul>
      <template v-if="store.user === null">
        <li>
          <RouterLink class="btn btn-secondary" to="/login">Login</RouterLink>
        </li>
        <li>
          <RouterLink class="btn" to="/signup">Sign Up</RouterLink>
        </li>
      </template>
      <template v-else>
        <li>
          <RouterLink to="/dashboard">
            {{ `${store.user.firstName} ${store.user.lastName}` }}
          </RouterLink>
        </li>
      </template>
    </ul>
  </nav>
  <main class="home-main bg-images">
    <section>
      <h1 class="text-gradient">Shorten Your Super Long Links</h1>
      <p>
        Shortly is an efficient and easy-to-use URL shortening service that streamlines your online
        experience.
      </p>
      <RouterLink class="btn" to="/signup">Get Started</RouterLink>
    </section>
  </main>
</template>
<style lang="css" scoped>
.home-nav {
  display: flex;
  position: fixed;
  top: 0;
  height: calc(20 * 0.25rem);
  width: 100vw;
  z-index: 5;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(3.5 * 0.25rem);
  left: 0;
  right: 0;
  a:not(a.btn) {
    color: var(--brand-blue);
    text-transform: capitalize;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
  h2 {
    font-size: 36px;
    font-weight: 600;
    letter-spacing: -0.1rem;
  }
  ul {
    display: flex;
    gap: 0.65rem;
    align-items: center;
  }
}
.home-main {
  height: 100dvh;
  display: grid;
  place-items: center;
  text-align: center;
  h1 {
    margin-bottom: calc(2 * var(--base-size));
  }
  p {
    opacity: 0.5;
    width: 80%;
    max-width: 360px;
    font-size: 14px;
    margin: 0 auto calc(3.5 * var(--base-size));
  }
}
</style>
