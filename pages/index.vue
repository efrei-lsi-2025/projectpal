<template>
  <div>
    <p class="title">
      Bienvenue, <strong>{{ auth.data.value?.user?.name }}</strong>
    </p>
    <h1>Récemment consulté</h1>
  </div>
</template>

<script lang="ts" setup>
const test = await $fetch("/api/test");
const testSession = await $fetch("/api/session");

const auth = useAuth();
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.3rem;
  margin-top: 0;
}
</style>
