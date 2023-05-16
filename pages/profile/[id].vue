<template class="all">
  <div class="profile-header">
    <div class="icon">
      <Avatar
        :image="user?.image"
        shape="circle"
        style="width: 150%; height: 150%; max-width: 150px"
      />
      <div>
        <h1>{{ user?.name }}</h1>
        <h3>
          {{ user?.projects.length }} projets pour
          {{
            user?.projects.reduce(
              (acc, project) => acc + project._count.assignedTo,
              0
            )
          }}
          tickets assignés
        </h3>
      </div>
    </div>
  </div>

  <div class="recent-activity">
    <h1>Activité récente</h1>
  </div>
  <DataTable
    :value="logs"
    paginator
    :rows="5"
    :rows-per-page-options="[5, 10, 20, 50]"
    table-style="min-width: 50rem"
  >
    <Column field="createdAt" header="Date" style="width: 25%"></Column>
    <Column field="user?.name" header="User" style="width: 25%"></Column>
    <Column field="text" header="Description" style="width: 25%"></Column>
  </DataTable>

  <div class="p-3 text-center"></div>
  <div classe="ticket-create"></div>
</template>

<script lang="ts" setup>
const route = useRoute();
const auth = useAuth();

const userId =
  (route.params.id as string) || (auth.data.value?.user.id as string);

const user: Ref<Awaited<ReturnType<typeof getUser>>> = ref();

onMounted(async () => {
  user.value = await getUser(userId);
});

const logs = user.value?.logs;
</script>

<style scoped lang="scss">
.all {
  display: flex;
  .profile-header {
    align-items: center;
    gap: 2rem;
  }
}
</style>
