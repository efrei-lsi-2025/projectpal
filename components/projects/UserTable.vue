<template>
    <div>
        <DataTable :value="modelValue" removableSort tableStyle="min-width: 50rem">
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
</template>
  
<script lang="ts" setup>

import { User, Role } from '@prisma/client'

const props = defineProps({
    modelValue: Array<Member>,
});

const emit = defineEmits<{
    (event: 'update:modelValue', payload: Ref<Array<Member>>): void,
}>();

interface Member {
    userId: string,
    role: string,
    name: string | null,
    image: string | null,
};

const auth = useAuth();

const users = ref([]);
const filteredUsers: Ref<Array<User>> = ref([]);
const selectedUser: Ref<User | undefined> = ref();

users.value = await $fetch('/api/projects/user');

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
  
<style lang="scss" scoped></style>
  