<template>
    <div class="project-layout">
        <div class="py-3 align-items-center formgrid grid">
            <div class="field col-12 md:col-6 pr-5">
                <h2 class="mr-4">Nom du projet</h2>
                <InputText id="name" class=" w-10" :class="{ 'p-invalid': errorMessage }" v-model="name" />
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
            </div>

            <div class="field col-12 md:col-6">
                <h2 class="mr-5">Client</h2>
                <ClientLookup class="mr-6 w-10" @client-selected="setSelectedClient" :client-list="clientList">
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
            <ProjectsUserTable :model-value="members" :users-available="userList"></ProjectsUserTable>
        </div>

        <div class="py-3">
            <h2>Catégories</h2>
            <Chips v-model="categories" class="block" />
        </div>

        <div class="py-3">
            <Button icon="pi pi-check" label="Valider" severity="success" @click="createProject"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Member } from "../../components/projects/UserTable.vue"

// Fetch data and init variables
const auth = useAuth();
const allUsers = await useGetAllUsers();
const allClients = ref(await useGetAllClients());

const name = ref("");
const description = ref("");
const color = ref("bebebe");
const categories: Ref<Array<string>> = ref([]);

const clientList = computed(() => {
    return allClients.value?.map(client => client.name)
})

const selectedClient = ref("");
const setSelectedClient = (client: string) => { selectedClient.value = client; }

const userList = ref(allUsers);
const members: Ref<Array<Member>> = ref([]);

// Current user added as a member with role OWNER
const user = await useGetUserByName(auth.data.value?.user?.name || "");

if (user) {
    members.value.push(
        {
            userId: user.id,
            role: "OWNER",
            image: user.image,
            name: user.name
        }
    );
}

// Form validation
const errorMessage = ref("")

function validateForm() {
    if (!name.value) {
        errorMessage.value = 'Name - Surname is required.';
    } else {
        errorMessage.value = ""
        return true;
    }

    return false;
}

// Create project on submit
const createProject = async () => {

    validateForm();
    if (!name.value) return;

    if (clientList.value?.includes(selectedClient.value)) {
        // Dialog, selon retour on quitte

    }

    // Give order to the ticket states and add in a list
    const ticketStates: Array<{ name: string, order: number }> = [];
    let i = 0;
    categories.value.forEach(category => {
        ticketStates.push({
            name: category,
            order: i++,
        });
    });

    // Create list of members with userId and role
    const projectMembers = members.value.map(member => {
        return {
            userId: member.userId,
            role: member.role
        };
    });

    // Create the project
    await usePostProject({
        name: name.value,
        description: description.value,
        color: color.value,
        client: selectedClient.value,
        ticketStates: ticketStates,
        projectMembers: projectMembers
    });
};

</script>

<style lang="scss" scoped>
.project-layout {
    margin: 1.5rem;
}
</style>
