<template>
  <div class="ticket">
    <h3>{{ project?.name }}</h3>
    <p>
      {{ project?.description }}
    </p>
    <div class="users" v-for="user in project?.members">
      <img :key="user?.id" :src="user?.user.image" class="user" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { projectId } = defineProps(["projectId"]);
const project: Ref<Awaited<ReturnType<typeof getProject>> | null> = ref(null);

onMounted(async () => {
  project.value = await getProject(projectId);
});
</script>

<style lang="scss" scoped>
.ticket {
  background-color: white;
  border-radius: 5px;
  padding: 0.2rem 1rem;
  margin-top: 1rem;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .users {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.5rem 0;
    margin-top: 0;

    .user {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-left: 0.5rem;
    }
  }
}
</style>
