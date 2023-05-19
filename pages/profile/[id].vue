<template>
  <div class="profile-header flex">
    <div>
      <Avatar :image="user?.image" shape="circle"
        style="width: 150%; height: 150%; max-width: 150px; max-height: 150px;" />

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

    <div>
      <h1>Projets Attribué</h1>

      <div class="test flex">


        <div v-for="projectId in user?.projects">

          <LogLine :projectId="projectId.projectId">
          </LogLine>
        </div>


      </div>
      <p class="recent-activity ">
      <h1>Activité récente</h1>
      </p>
      <div>
        <DataTable :value="user?.logs" paginator :rows="5" :rows-per-page-options="[5, 10, 20, 50]"
          table-style="min-width: 50rem">
          <Column field="createdAt" header="Date" style="width: 25%"></Column>
          <!-- <Column field="user" header="User" style="width: 25%"></Column> -->
          <Column field="text" header="Description" style="width: 25%"></Column>
        </DataTable>

      </div>
    </div>
  </div>
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

</script>

<style scoped lang="scss">
.profile-header {
  // align-items: center;
  gap: 5rem;
  display: flex;
  margin-top: 2rem;
}

.recent-activity {
  gap: 2rem;
  margin-top: 5rem;
}

.test {
  gap: 2rem;
  margin-top: 2rem;
}
</style>
