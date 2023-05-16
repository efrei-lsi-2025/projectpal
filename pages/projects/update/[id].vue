<template>
    <div class="project-layout" v-if="project && loaded">
        <div class="py-3 align-items-center formgrid grid">
            <div class="field col-12 md:col-6 pr-5">
                <h2 class="mr-4">Nom du projet</h2>
                <InputText id="name" class=" w-10" :class="{ 'p-invalid': nameErrorMessage }" v-model="name" />
                <small class="p-error" id="text-error">{{ nameErrorMessage || '&nbsp;' }}</small>
            </div>

            <div class="field col-12 md:col-6">
                <h2 class="mr-5">Client</h2>
                <ClientLookup v-if="loaded" class="mr-6 w-10" @client-selected="setSelectedClient" :client-list="clientList"
                    :default-selected="selectedClient">
                </ClientLookup>
                <ColorPicker v-model="color" />
            </div>
        </div>

        <div class="py-3">
            <h2>Description</h2>
            <TextArea v-model="description" autoResize rows="5" class="w-full" />
        </div>

        <div class="py-3">
            <small class="p-error" id="text-error">{{ membersErrorMessage || '&nbsp;' }}</small>
            <ProjectsUserTable :model-value="members ?? []" :users-available="userList"></ProjectsUserTable>
        </div>

        <div class="py-3">
            <h2>Catégories</h2>
            <Chips v-model="categories" class="block" disabled />
        </div>

        <div class="py-3">
            <Button icon="pi pi-check" label="Valider" severity="success" @click="updateProject"></Button>
        </div>
    </div>
    <div class="project-layout" v-if="!project && loaded">
        <h1 style="color: #f83a3a; font-size: x-large;">Projet introuvable</h1>
        <p>Id : {{ route.params.id }}</p>
    </div>
</template>

<script setup lang="ts">
const auth = useAuth();
const route = useRoute();

// Init variables
const project: Ref<Awaited<ReturnType<typeof getProject>>> = ref();
const allUsers: Ref<Awaited<ReturnType<typeof getUsers>>> = ref();
const allClients: Ref<Awaited<ReturnType<typeof getClients>>> = ref();

const name: Ref<string | undefined> = ref();
const description: Ref<string | undefined> = ref();
const color: Ref<string | undefined> = ref();
const categories: Ref<Exclude<Awaited<ReturnType<typeof getProject>>, undefined>["ticketStates"] | undefined> = ref();

const selectedClient: Ref<string | undefined> = ref();
const members: Ref<Exclude<Awaited<ReturnType<typeof getProject>>, undefined>["members"] | undefined> = ref();
const loaded = ref(false);

// Fetch data
onMounted(async () => {
    project.value = Number.isInteger(Number(route.params.id)) ? await getProject(route.params.id as string) : undefined;
    allUsers.value = await getUsers();
    allClients.value = await getClients();

    name.value = project.value?.name;
    description.value = project.value?.description;
    color.value = project.value?.color;
    categories.value = project.value?.ticketStates;
    selectedClient.value = project.value?.client.name ?? "";
    members.value = project.value?.members;
    loaded.value = true;
});

// Initialize dropdowns / lookups lists
const clientList = computed(() => {
    return allClients.value?.map(client => client.name)
})
const userList = ref(allUsers);

// Used by the client lookup to set the selected client
const setSelectedClient = (client: string) => {
    selectedClient.value = client;
}

// Form validation
const nameErrorMessage = ref("");
const membersErrorMessage = ref("");

function validateForm() {
    let valid = true;

    if (!name.value) {
        nameErrorMessage.value = "Un nom de projet est requis.";
        valid = false;
    }

    if (!members.value?.find(member => member.role === "OWNER")) {
        membersErrorMessage.value = "Un membre du projet avec le rôle OWNER est requis."
    }

    if (valid) {
        nameErrorMessage.value = "";
        membersErrorMessage.value = "";
    }

    return valid;;
}

// Update project on submit
const updateProject = async () => {

    if (!validateForm()) {
        warn("Champs manquants ou invalides.");
        return;
    }

    // TODO : update project

    const updated = true;

    if (updated) {
        success("Projet modifié.");
    } else {
        error("Échec lors de la modification du projet.");
    }
};

</script>

<style lang="scss" scoped>
.project-layout {
    margin: 1.5rem;
}
</style>
