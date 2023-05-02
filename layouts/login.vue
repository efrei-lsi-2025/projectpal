<template>
  <div class="login-layout">
    <img src="../assets/branding/logo-big.svg" alt="ProjectPal Logo" />
    <div class="content">
      <slot />
    </div>
    <span class="p-muted"
      ><b>ProjectPal</b> • Projet réalisé dans le cadre du module de Web @
      EFREI</span
    >

    <Footer></Footer>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.login-layout {
  border-top: 5px solid #000;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  flex-direction: column;

  gap: 1rem;

  .content {
    margin: 2rem 0;
  }

  span {
    margin-top: 2rem;
  }
}
</style>
