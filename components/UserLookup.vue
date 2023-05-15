<template>
  <AutoComplete
    class="inline-block"
    input-class="w-11"
    v-model="selectedUser"
    :suggestions="filteredUsers"
    optionLabel="name"
    @complete="searchUser"
    forceSelection
    dropdown-icon="pi pi-search"
    dropdown
  >
  </AutoComplete>
</template>

<script setup lang="ts">
const props = defineProps({
  userList: Array<any>,
});

const emit = defineEmits<{
  (event: "user-selected", payload: any): void;
}>();

const users: Ref<Array<any>> = ref(props.userList ?? []);
const filteredUsers: Ref<Array<any>> = ref([]);
const selectedUser: Ref<any | undefined> = ref();

watch(selectedUser, (user) => emit("user-selected", user));

const searchUser = (event: { originalEvent: Event; query: string }) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredUsers.value = [...users.value];
    } else {
      filteredUsers.value = users.value.filter((user: any) => {
        return user.name?.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};
</script>

<style scoped></style>
