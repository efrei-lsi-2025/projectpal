<template>
  {{ project?.name }}
</template>

<script lang="ts" setup>
const route = useRoute();

const id = route.params.id as string;
const project = await getProject(id);
</script>
