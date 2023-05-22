<template>
  <div>
    <Head>
      <Title>ProjectPal - Login</Title>
    </Head>
  </div>

  <div>
    <Button
      icon="pi pi-github"
      size="large"
      label="Se connecter avec GitHub"
      @click="signIn('github')"
    ></Button>
  </div>
</template>

<script lang="ts" setup>
const { signIn, data } = useAuth();

definePageMeta({
  layout: "login",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
</script>
