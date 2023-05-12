<template>
    <div class="project-layout">
        <div class="py-3 align-items-center formgrid grid">
            <div class="field col-12 md:col-6 pr-5">
                <h2 class="mr-4">Nom du projet</h2>
                <InputText class=" w-10" v-model="name" />
            </div>

            <div class="field col-12 md:col-6">
                <h2 class="mr-5">Client</h2>
                <ClientLookup class="mr-6 w-10" @client-selected="setSelectedClient"></ClientLookup>
                <ColorPicker v-model="color" />
            </div>
        </div>

        <div class="py-3">
            <h2>Description</h2>
            <TextArea v-model="description" autoResize rows="5" class="w-full" />
        </div>

        <div class="py-3">
            <h2>Utilisateurs</h2>
            <ProjectsUserTable :model-value="projectMembers" :users-available="userList"></ProjectsUserTable>
        </div>

        <div class="py-3">
            <h2>Catégories</h2>
            <Chips v-model="ticketStates" class="block" />
        </div>

        <div class="py-3">
            <Button icon="pi pi-check" label="Valider" severity="success" @click="createProject"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Client, Role, User } from '@prisma/client';
import { Member } from "../../components/projects/UserTable.vue"

const auth = useAuth();

const name = ref("");
const description = ref("");
const color = ref("f3a40b");
const ticketStates = ref([]);

const clientList: Ref<Array<Client>> = ref(await $fetch('/api/projects/clients'));
const selectedClient: Ref<Client | undefined> = ref();
const setSelectedClient = (client: undefined | null | string | Client) => {
    if (typeof client !== "string" && client !== null) { selectedClient.value = client; }
}

const userList: Ref<Array<User>> = ref(await $fetch('/api/projects/users'));
const user = (await $fetch(`/api/projects/user/${auth.data.value?.user?.name}`) as User);
const projectMembers: Ref<Array<Member>> = ref([]);
projectMembers.value.push(
    {
        userId: user.id,
        role: Role.OWNER,
        image: user.image,
        name: user.name,
        email: user.email
    }
);

const createProject = (): void => {
    console.log(
        "Project : " + name.value + "\n" +
        "Color : " + color.value + "\n" +
        "Client : " + selectedClient.value?.name + "\n" +
        "Categories : " + ticketStates.value.toString() + "\n" +
        "Members : " + projectMembers.value.map(value => "\n\t" + value.userId + " " + value.role.toString()) + "\n" +
        "Description : " + description.value + "\n"
    )
};

</script>

<style lang="scss" scoped>
.project-layout {
    margin: 1.5rem;
}
</style>
