<template>
  <div>
    <Button
      icon="pi pi-github"
      size="large"
      label="Se connecter avec GitHub"
      :loading="loading"
      @click="signIn('github')"
    ></Button>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "login",
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/" },
});

const { signIn } = useAuth();
</script>
