<template>
  <div class="footer">
    Build {{ shortSha }} ({{ config.public.vercel.branch }} -
    {{ config.public.vercel.env }})
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const shortSha = config.public.vercel.commitSha.slice(0, 7);
</script>

<style lang="scss" scoped>
.footer {
  // hoist the footer to the bottom of the page
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #000;
  color: #fff;
  display: flex;

  padding: 0.5rem 1rem;
}
</style>
