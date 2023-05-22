<template>
  <div>
    <Head>
      <Title>ProjectPal - Profil</Title>
    </Head>
  </div>

  <div class="flex justify-content-end -mt-8 mb-8 mr-8 pt-2">
    <Button
      icon="pi pi-plus"
      label="Nouveau"
      class=""
      size="small"
      @click="navigateTo('/projects/create')"
    ></Button>
  </div>

  <div class="grid mt-5 ml-5">
    <div class="col-4">
      <div class="align-items-center">
        <Avatar
          :image="user?.image"
          shape="circle"
          style="width: 150%; height: 150%; max-width: 150px; max-height: 150px"
        />
        <div>
          <h1>{{ user?.name }}</h1>
          <h3>
            {{ user?.projects.length }} projets pour
            {{ user?.projects.length }} tickets assignés
          </h3>
        </div>
      </div>

      <div class="recent-activity">
        <h1>Activité récente</h1>
        <ul>
          <li v-for="log in logs?.slice(0, 15)">
            <span class="strong">{{ log.user.name }}</span
            >&nbsp; <span>{{ log.text }}</span> le&nbsp;
            <span>{{ new Date(log.createdAt).toLocaleDateString("fr") }}</span>
          </li>
        </ul>
        <p v-if="(logs?.length ?? -1) <= 0">Aucune activité récente</p>
      </div>
    </div>

    <div class="col-8">
      <div>
        <h1>Projets attribués</h1>
        <div class="mt-6 flex flex-wrap column-gap-5">
          <div v-for="projectMember in user?.projects">
            <ProjectsCard
              class=""
              :project="projectMember.project"
            ></ProjectsCard>
          </div>
        </div>
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
const logs: Ref<Awaited<ReturnType<typeof getLogs>>> = ref();

onMounted(async () => {
  user.value = await getUser(userId);
  logs.value = await getLogs(userId);
});
</script>

<style scoped lang="scss">
.recent-activity {
  gap: 2rem;
  margin-top: 5rem;
}

.test {
  gap: 2rem;
  margin-top: 2rem;
}

.strong {
  font-weight: bold;
}
</style>
