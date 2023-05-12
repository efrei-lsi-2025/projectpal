<template>
    <AutoComplete class="inline-block" input-class="w-11" v-model="selectedClient" :suggestions="filteredClients"
        optionLabel="name" @complete="searchClient" forceSelection dropdown-icon="pi pi-search" dropdown>
    </AutoComplete>
</template>

<script setup lang="ts">
import { Client } from '@prisma/client';

const props = defineProps({
    clientList: Array<Client>
});

const emit = defineEmits<{
    (event: 'client-selected', payload: Client | string | null | undefined): void,
}>();

const clients = ref(props.clientList ?? []);
const filteredClients: Ref<Array<Client>> = ref([]);
const selectedClient: Ref<Client | undefined> = ref();

clients.value = await $fetch('/api/projects/clients');
watch(selectedClient, client => emit('client-selected', client));

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

</script>

<style scoped></style>