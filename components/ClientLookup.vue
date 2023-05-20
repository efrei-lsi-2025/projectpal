<template>
  <AutoComplete
    v-model="selectedClient"
    class="inline-block"
    :class="props.autoCompleteClass"
    input-class="w-11"
    :suggestions="filteredClients"
    dropdown-icon="pi pi-search"
    dropdown
    @complete="searchClient"
    @blur="onBlur()"
  >
  </AutoComplete>
  <Dialog
    v-model:visible="isDialogVisible"
    modal
    :draggable="false"
    :closable="false"
    header="Souhaitez-vous créer un nouveau client ?"
  >
    <div class="">
      <div class="flex justify-content-center">
        <Button
          rounded
          outlined
          icon="pi pi-check"
          severity="success"
          class="mr-3"
          @click="confirmCreateClient(true)"
        ></Button>
        <Button
          rounded
          outlined
          icon="pi pi-times"
          severity="danger"
          @click="confirmCreateClient(false)"
        ></Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  autoCompleteClass: string;
  clientList: Array<string> | undefined;
  defaultSelected: string | undefined;
}>();

const emit = defineEmits<{
  (event: "client-selected", payload: string): void;
}>();

const clients = ref(props.clientList ?? []);
const filteredClients: Ref<Array<string>> = ref([]);
const selectedClient = ref("");

const isDialogVisible = ref(false);

onMounted(() => {
  selectedClient.value = props.defaultSelected ?? "";
});

watch(selectedClient, (client) => emit("client-selected", client));

const searchClient = (event: { originalEvent: Event; query: string }) => {
  if (!event.query.trim().length) {
    filteredClients.value = [...clients.value];
  } else {
    filteredClients.value = clients.value.filter((client: string) => {
      return client.toLowerCase().startsWith(event.query.toLowerCase());
    });
  }
};

const onBlur = () => {
  console.log(selectedClient.value);
  console.log(clients.value.indexOf(selectedClient.value));
  if (clients.value.indexOf(selectedClient.value) == -1) {
    isDialogVisible.value = true;
  }
};

const confirmCreateClient = (confirm: boolean) => {
  if (!confirm) {
    selectedClient.value = "";
  }
  isDialogVisible.value = false;
};
</script>

<style scoped></style>
