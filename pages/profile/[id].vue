<template>
  <div class="grid m-5">
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
      </div>
    </div>

    <div class="col-7">
      <div>
        <h1>Projets attribué</h1>
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
