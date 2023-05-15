<template>
    <div class="project-layout" v-if="project">
        <div class="py-3 align-items-center formgrid grid">
            <div class="field col-12 md:col-6 pr-5">
                <h2 class="mr-4">Nom du projet</h2>
                <InputText id="name" class=" w-10" :class="{ 'p-invalid': nameErrorMessage }" v-model="name" />
                <small class="p-error" id="text-error">{{ nameErrorMessage || '&nbsp;' }}</small>
            </div>

            <div class="field col-12 md:col-6">
                <h2 class="mr-5">Client</h2>
                <ClientLookup class="mr-6 w-10" @client-selected="setSelectedClient" :client-list="clientList"
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
            <h2>Utilisateurs</h2>
            <small class="p-error" id="text-error">{{ membersErrorMessage || '&nbsp;' }}</small>
            <ProjectsUserTable :model-value="projectUsers" :users-available="userList"></ProjectsUserTable>
        </div>

        <div class="py-3">
            <h2>Catégories</h2>
            <Chips v-model="categories" class="block" disabled />
        </div>

        <div class="py-3">
            <Button icon="pi pi-check" label="Valider" severity="success" @click="updateProject"></Button>
        </div>
    </div>
    <div class="project-layout" v-if="!project">
        <h1 style="color: #f83a3a; font-size: x-large;">Projet introuvable</h1>
        <p>Id : {{ route.params.id }}</p>
    </div>
</template>

<script setup lang="ts">
const auth = useAuth();
const route = useRoute();

// Fetch data
const allUsers = await useGetAllUsers();
const allClients = ref(await useGetAllClients());
const project = Number.isInteger(Number(route.params.id)) ? await useGetProjectById(Number(route.params.id)) : null;

// Initialize dropdowns / lookups lists
const clientList = computed(() => {
    return allClients.value?.map(client => client.name)
})
const userList = ref(allUsers);

// Initialize fields
const name = ref(project?.name);
const description = ref(project?.description);
const color = ref(project?.color);
const categories: Ref<Array<{ name: string; order: number; projectId: number; }> | undefined> = ref(project?.ticketStates); // TODO
const selectedClient = ref(project?.clientName ?? "");
console.log(project?.clientName);
console.log(selectedClient.value)
const members: Ref<Array<{ id: string; projectId: number; userId: string; role: string; }> | undefined> = ref(project?.members);

// Create a list with all the informations needed to display the project members (add informations about user)
const projectUsers: Ref<{ userId: string; role: string; name: string | null; image: string | null; }[]> = ref(
    members.value
        ?.map(member => ({
            member: member,
            user: allUsers?.find(user => user.id === member.userId)
        }))
        .map(value => ({
            userId: value.member.userId,
            role: value.member.role,
            name: value.user?.name ?? null,
            image: value.user?.image ?? null
        }))
    ?? []
);

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

    if (!projectUsers.value.find(member => member.role === "OWNER")) {
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

    if (!validateForm()) return;

    // TODO : update project

};

</script>

<style lang="scss" scoped>
.project-layout {
    margin: 1.5rem;
}
</style>
