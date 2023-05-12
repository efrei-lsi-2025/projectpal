<template>
    <div class="project-layout">
        <div class="py-3 align-items-center formgrid grid">
            <div class="field col-12 md:col-6 pr-5">
                <h2 class="mr-4">Nom du projet</h2>
                <InputText class=" w-10" v-model="name" />
            </div>

            <div class="field col-12 md:col-6">
                <h2 class="mr-5">Client</h2>
                <ClientLookup class="mr-6 w-10" @client-selected="setSelectedClient" :client-list="clientList"></ClientLookup>
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
import { Client, Role, User } from '@prisma/client';
import { Member } from "../../components/projects/UserTable.vue"

const auth = useAuth();

const name = ref("");
const description = ref("");
const color = ref("f3a40b");
const categories: Ref<Array<string>> = ref([]);

const clientList: Ref<Array<Client>> = ref(await $fetch('/api/client'));
const selectedClient: Ref<Client | undefined> = ref();
const setSelectedClient = (client: undefined | null | string | Client) => {
    if (typeof client !== "string" && client !== null) { selectedClient.value = client; }
}

const userList: Ref<Array<User>> = ref(await $fetch('/api/user'));
const user = (await $fetch(`/api/user/${auth.data.value?.user?.name}`) as User);
const members: Ref<Array<Member>> = ref([]);
members.value.push(
    {
        userId: user.id,
        role: Role.OWNER,
        image: user.image,
        name: user.name,
        email: user.email
    }
);

const createProject = async () => {

    const ticketStates = categories.value.map(category => {
        return {
            name: category,
            color: "",
            order: 0,
        };
    });

    const projectMembers = members.value.map(member => {
        return {
            userId: member.userId,
            role: member.role
        };
    });

    const data = {
        name: name.value,
        description: description.value,
        client: selectedClient.value,
        ticketStates: ticketStates,
        projectMembers: projectMembers
    };

    const project = await $fetch('/api/project/create', {method: 'post', body: {data}})
};

</script>

<style lang="scss" scoped>
.project-layout {
    margin: 1.5rem;
}
</style>
