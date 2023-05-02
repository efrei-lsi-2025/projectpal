<template>
  <div>
    <h1>Index page</h1>
    <p>{{ test }}</p>
  </div>
</template>

<script lang="ts" setup>
const test = await $fetch("/api/test");
</script>
