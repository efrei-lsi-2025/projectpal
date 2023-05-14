<template>
  {{ project }}
</template>

<script lang="ts" setup>
const auth = useAuth();
const route = useRoute();

const project = await useGetProjectById(route.params.id as number);
</script>
