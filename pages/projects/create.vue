<template>
  <div class="flex justify-content-end -mt-8 mb-6 mr-8 pt-2">
    <Button
      icon="pi pi-arrow-left"
      label="Retour"
      class=""
      size="small"
      @click="$router.back()"
    ></Button>
  </div>

  <div v-if="loaded" class="project-layout">
    <div class="py-3 align-items-center formgrid grid">
      <div class="field col-12 md:col-6 pr-5">
        <h2 class="mr-4">Nom du projet</h2>
        <InputText
          id="name"
          v-model="name"
          class="w-10"
          :class="{ 'p-invalid': errorMessage }"
        />
        <small id="text-error" class="p-error">{{
          errorMessage || "&nbsp;"
        }}</small>
      </div>

      <div class="field col-12 md:col-6">
        <h2 class="mr-5">Client</h2>
        <ClientLookup
          auto-complete-class="mr-6 w-10"
          :client-list="clientList"
          :default-selected="undefined"
          @client-selected="setSelectedClient"
        >
        </ClientLookup>
        <ColorPicker v-model="color" />
      </div>
    </div>

    <div class="py-3">
      <h2>Description</h2>
      <TextArea v-model="description" auto-resize rows="5" class="w-full" />
    </div>

    <div class="py-3">
      <ProjectsUserTable
        :model-value="members ?? []"
        :users-available="userList"
      ></ProjectsUserTable>
    </div>

    <div class="py-3">
      <h2>Catégories</h2>
      <Chips v-model="stateLabels" class="block" />
    </div>

    <div class="py-3">
      <Button
        icon="pi pi-check"
        label="Valider"
        severity="success"
        @click="createNewProject"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();

// Init variables
const allUsers: Ref<Awaited<ReturnType<typeof getUsers>>> = ref();
const allClients: Ref<Awaited<ReturnType<typeof getClients>>> = ref();

const name: Ref<string | undefined> = ref("");
const description: Ref<string | undefined> = ref("");
const color: Ref<string | undefined> = ref("bebebe");
const stateLabels: Ref<Array<string>> = ref([]);
const selectedClient: Ref<string | undefined> = ref("");
const members: Ref<
  | Exclude<Awaited<ReturnType<typeof getProject>>, undefined>["members"]
  | undefined
> = ref([]);

const loaded = ref(false);

// Fetch data
onMounted(async () => {
  allUsers.value = await getUsers();
  allClients.value = await getClients();
  const user = await getUser(auth.data.value?.user?.id ?? "");
  if (user) {
    members.value?.push({
      id: "",
      role: "OWNER",
      user: {
        id: user?.id,
        name: user?.name,
        image: user?.image,
      },
    });
  }
  loaded.value = true;
});

// Initialize dropdowns / lookups lists
const clientList = computed(() => {
  return allClients.value?.map((client) => client.name);
});
const userList = ref(allUsers);

// Used by the client lookup to set the selected client
const setSelectedClient = (client: string) => {
  selectedClient.value = client;
};

// Form validation
const errorMessage = ref("");

function validateForm() {
  if (!name.value) {
    errorMessage.value = "Un nom de projet est requis.";
  } else {
    errorMessage.value = "";
    return true;
  }

  return false;
}

// Create project on submit
const createNewProject = async () => {
  if (!validateForm()) {
    warn("Champs manquants ou invalides.");
    return;
  }

  if (clientList.value?.includes(selectedClient.value ?? "")) {
    // Dialog, selon retour on quitte
  }

  // Give order to the ticket states and add in a list
  const ticketStates: Array<{ name: string; order: number }> = [];
  let i = 0;

  stateLabels.value?.forEach((label) => {
    ticketStates.push({
      name: label,
      order: i++,
    });
  });

  // Create list of members with userId and role
  const projectMembers =
    members.value?.map((member) => {
      return {
        userId: member.user.id,
        role: member.role,
      };
    }) ?? [];

  // Create the project
  await createProject({
    name: name.value ?? "",
    description: description.value ?? "",
    color: color.value ?? "",
    client: selectedClient.value ?? "",
    ticketStates,
    projectMembers,
  });
};
</script>

<style lang="scss" scoped>
.project-layout {
  margin: 1.5rem;
}
</style>
