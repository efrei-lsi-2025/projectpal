<template>
  <AutoComplete
    v-model="selectedClient"
    class="inline-block"
    input-class="w-11"
    :suggestions="filteredClients"
    dropdown-icon="pi pi-search"
    dropdown
    @complete="searchClient"
  >
  </AutoComplete>
</template>

<script setup lang="ts">
const props = defineProps<{
  clientList: Array<string> | undefined;
  defaultSelected: string | undefined;
}>();

const emit = defineEmits<{
  (event: 'client-selected', payload: string): void;
}>();

const clients = ref(props.clientList ?? []);
const filteredClients: Ref<Array<string>> = ref([]);
const selectedClient = ref('');

onMounted(() => {
  selectedClient.value = props.defaultSelected ?? '';
});

watch(selectedClient, (client) => emit('client-selected', client));

const searchClient = (event: { originalEvent: Event; query: string }) => {
  if (!event.query.trim().length) {
    filteredClients.value = [...clients.value];
  } else {
    filteredClients.value = clients.value.filter((client: string) => {
      return client.toLowerCase().startsWith(event.query.toLowerCase());
    });
  }
};
</script>

<style scoped></style>
