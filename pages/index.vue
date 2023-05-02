<template>
  <div>
    <h1>Index page</h1>
    <p>{{ test }}</p>
    <p>{{ testSession }}</p>

    {{ auth.status }}
    <p><button @click="auth.signIn('github')">Test Login</button></p>
  </div>
</template>

<script lang="ts" setup>
const test = await $fetch("/api/test");
const testSession = await $fetch("/api/session");

const auth = useAuth();
</script>
