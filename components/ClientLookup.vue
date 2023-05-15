<template>
    <AutoComplete class="inline-block" input-class="w-11" v-model="selectedClient" :suggestions="filteredClients"
        optionLabel="name" @complete="searchClient" dropdown-icon="pi pi-search" dropdown>
    </AutoComplete>
</template>

<script setup lang="ts">

const props = defineProps(
    ["clientList"]
);

const emit = defineEmits<{
    (event: 'client-selected', payload: any): void,
}>();

const clients = ref(props.clientList ?? []);
const filteredClients: Ref<Array<any>> = ref([]);
const selectedClient: Ref<any> = ref();

watch(selectedClient, client => emit('client-selected', client));

const searchClient = (event: { originalEvent: Event, query: string }) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredClients.value = [...clients.value];
        } else {
            filteredClients.value = clients.value.filter((client: any) => {
                return client.name?.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

</script>

<style scoped></style>