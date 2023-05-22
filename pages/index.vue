<template>
  <div>
    <p class="title">
      Bienvenue, <strong>{{ auth.data.value?.user?.name }}</strong>
    </p>
    <h1>Récemment consulté</h1>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuth();

if (auth.data.value?.user) {
  navigateTo(`/profile/${auth.data.value.user.id}`);
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.3rem;
  margin-top: 0;
}
</style>
