<template>
  <div class="footer">
    <span
      >Build {{ shortSha }} ({{ config.public.vercel.branch }} -
      {{ config.public.vercel.env }})</span
    >
    <span>
      Built with <img src="../assets/branding/nuxt.svg" />
      <a href="https://nuxtjs.org">Nuxt.js</a> and
      <img src="../assets/branding/primevue.svg" />
      <a href="https://primefaces.org/primevue/">PrimeVue</a>
    </span>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const shortSha = config.public.vercel.commitSha.slice(0, 7);
</script>

<style lang="scss" scoped>
.footer {
  // hoist the footer to the bottom of the page
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1rem;

  a {
    color: #fff;
    font-weight: bold;
    text-decoration: none;
  }

  img {
    height: 1rem;
    margin-right: 0.2rem;
    margin-left: 0.1rem;
    transform: translateY(0.15rem);
  }
}
</style>
