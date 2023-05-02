<template>
  <slot />
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  flex-direction: column;

  gap: 1rem;
}
</style>
