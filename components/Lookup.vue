<template>
  <AutoComplete
    class="inline-block"
    input-class="w-11"
    v-model="selection"
    :suggestions="filtered"
    optionLabel="name"
    @complete="searchUser"
    forceSelection
    dropdown-icon="pi pi-search"
    dropdown
  >
  </AutoComplete>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: Array<{ id: string; name: string }> | undefined;
}>();

const emit = defineEmits<{
  (event: "selected", payload: string): void;
}>();

const filtered: Ref<any[]> = ref([...(props.list ?? [])]);
const selection: Ref<string> = ref("");

watch(selection, (selection) => emit("selected", selection));

const searchUser = (event: { originalEvent: Event; query: string }) => {
  if (!event.query.trim().length) {
    filtered.value = [...(props.list ?? [])];
  } else {
    filtered.value =
      props.list ??
      [].filter((user: any) => {
        return user.name?.toLowerCase().startsWith(event.query.toLowerCase());
      });
  }
};
</script>

<style scoped></style>
