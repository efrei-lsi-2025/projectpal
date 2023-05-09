<template>
  <div class="default-layout">
    <Header></Header>

    <div class="content">
      <slot />
    </div>

    <Footer></Footer>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.default-layout {
  position: relative;
  border-top: 5px solid #000;

  min-height: 100vh;
  background-color: #f5f5f5;
  flex-direction: column;

  gap: 1rem;

  .content {
    margin: 5px 35px;
    padding-bottom: 2.5rem;
  }
}
</style>
