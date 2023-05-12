<template>
    <AutoComplete class="inline-block" input-class="w-11" v-model="selectedUser" :suggestions="filteredUsers"
        optionLabel="name" @complete="searchUser" forceSelection dropdown-icon="pi pi-search" dropdown>
    </AutoComplete>
</template>

<script setup lang="ts">
import { User } from '@prisma/client';

const emit = defineEmits<{
    (event: 'user-selected', payload: User | string | null | undefined): void,
}>();

const users = ref([]);
const filteredUsers: Ref<Array<User>> = ref([]);
const selectedUser: Ref<User | undefined> = ref();

users.value = await $fetch('/api/projects/users');
watch(selectedUser, user => emit('user-selected', user));

const searchUser = (event: { originalEvent: Event, query: string }) => {
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

</script>

<style scoped></style>