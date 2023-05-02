<template>
  <div class="login">
    <img src="../assets/branding/logo-big.svg" alt="ProjectPal Logo" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
