<template>
    <div class="mx-20px">
        <div class="section">
            <label for="nameInput" class="title">Nom du projet</label>
            <ColorPicker v-model="color" />
            <InputText id="nameInput" v-model="name" />

            <span class="title label">Client</span>
            <AutoComplete v-model="selectedClient" :suggestions="filteredClients" optionLabel="name" @complete="searchClient"
                class="autocomplete" forceSelection></AutoComplete>
        </div>

        <div class="section">
            <p class="title">Description</p>
            <TextArea v-model="description" autoResize rows="5" class="w-100 p-inputtext" />
        </div>

        <div class="section">
            <p class="title">Utilisateurs</p>
            
            <DataTable :value="projectMembers" removableSort tableStyle="min-width: 50rem">
                <Column field="name" sortable header="Nom">
                    <template #body="slotProps">
                        <div style="display: flex; align-items: center; gap: 25px;">
                            <img :src="`${slotProps.data.image}`" style="width: 30px; border-radius: 50%;" />
                            <span>{{ slotProps.data.name }}</span>
                        </div>
                        
                    </template>
                </Column>
                <Column field="role" sortable header="Role"></Column>
            </DataTable>

        </div>

        <div class="section">
            <p class="title">Catégories</p>
            <Chips v-model="ticketStates" />
        </div>

        <div class="section">
            <Button icon="pi pi-check" label="Valider" severity="success" @click="createProject"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Client, Role } from '@prisma/client';
import { User } from '@prisma/client';
import { ProjectMember } from '@prisma/client';
import { type } from 'os';


type Member = {
    userId: string,
    role: string,
    name: string | null,
    image: string | null,
}

const auth = useAuth();

let name = ref("");
let description = ref("");
let color = ref("f3a40b");
let ticketStates = ref([]);

// Clients
const clients = ref([]);
const filteredClients = ref([]);
const selectedClient: Ref<Client | undefined> = ref();

clients.value = await $fetch('/api/projects/clients');

// Utilisateurs et membres
const users = ref([]);
const filteredUsers: Ref<Array<User>> = ref([]);
const selectedUser: Ref<User | undefined> = ref();

users.value = await $fetch('/api/projects/user');
const user = (await $fetch(`/api/projects/user/${auth.data.value?.user?.name}`) as User)
const projectMembers: Ref<Array<Member>> = ref([]);
projectMembers.value.push(
    {
        userId: user.id,
        role: Role.OWNER,
        image: user.image,
        name: user.name,
    }
);


const searchClient = (event: { originalEvent: Event, query: string }) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredClients.value = [...clients.value];
        } else {
            filteredClients.value = clients.value.filter((client: Client) => {
                return client.name?.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

const searchUser = (event: {originalEvent: Event, query: string}) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredUsers.value = [...users.value];
        } else {
            filteredUsers.value = users.value.filter((user: User) => {
                return user.name?.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

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
.section {
    padding: 1.5em 0;
}

.mx-20px {
    margin: 0px 20px;
}

.title {
    color: #000;
    font-weight: bold;
    font-size: 1.2rem;
}

.w-100 {
    width: 100%;
}

.section>.p-chips {
    display: block;
}

.section:first-of-type {
    display: grid;
    grid-template-columns: 1fr 1fr 4fr 1fr 3fr;
    column-gap: 20px;
}

.autocomplete {
    display: grid;
}

label,
.label {
    display: inline-block;
    margin: 0.5rem 0;
}
</style>
