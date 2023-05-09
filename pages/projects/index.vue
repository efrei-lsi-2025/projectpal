<template>
  <div class="mx-20px">
    <div class="section">
      <label for="nameInput" class="title">Nom du projet</label>
      <ColorPicker v-model="color" />
      <InputText id="nameInput" v-model="name" />

      <!-- Pour le client, remplacer le InputText par un autre composant, plus tard -->
      <span class="title label">Client</span>
      <AutoComplete v-model="selectedClient" :suggestions="filteredClients" optionLabel="name" @complete="search" class="autocomplete" forceSelection>
      </AutoComplete>
    </div>

    <div class="section">
      <p class="title">Description</p>
      <TextArea v-model="description" autoResize rows="5" class="w-100 p-inputtext" />
    </div>

    <div class="section">
      <p class="title">Utilisateurs</p>
      <!-- Composant à ajouter pour les utilisateurs -->
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
import { Client } from '@prisma/client';


let name = ref("");
let description = ref("");
let color = ref("f3a40b");
let ticketStates = ref([]);

const createProject = (): void => {

};

const clients = ref([]);
const filteredClients = ref([]);
const selectedClient = ref();

clients.value = await $fetch('/api/clients');

const search = (event: { originalEvent: Event, query: string }) => {
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
