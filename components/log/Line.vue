<template>
  <div>
    <p>{{ log.date }} • {{ log.user?.name }} {{ log.text }}</p>
  </div>
</template>

<script setup>
const { log } = defineProps(["log"]);
</script>
