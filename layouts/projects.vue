<template>

  <div class="page-wrapper">
    
    <div class="topline"></div>

    <div class="body">

      <slot />

    </div>

    <Footer></Footer>

  </div>

</template>


<script lang="ts" setup></script>


<style lang="scss" scoped>

.page-wrapper {
  position: relative;
  min-height: 100vh;
}

.topline {
  background: #000;
  height: 5px;
}

.body {
  margin: 5px 20px;
  padding-bottom: 2.5rem;
}

</style>
