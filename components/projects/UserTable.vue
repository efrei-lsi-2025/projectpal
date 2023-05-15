<template>
    <div>
        <DataTable :value="modelValue" removableSort tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex justify-content-between align-items-center pr-5">
                    <h2>Utilisateurs</h2>
                    <Button icon="pi pi-user-plus" @click="setDialogVisible(true)" class="my-2" severity="info" size="large"></Button>
                </div>
            </template>


            <Column field="name" sortable header="Nom">
                <template #body="slotProps">
                    <div class="flex align-items-center gap-4">
                        <img :src="`${slotProps.data.image}`" style="width: 30px; border-radius: 50%;" />
                        <span>{{ slotProps.data.name }}</span>
                    </div>
                </template>
            </Column>
            <Column field="email" header="Email"></Column>
            <Column field="role" sortable header="Role"></Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="isDialogVisible" modal header="Add User" class="w-5" :draggable="false">
        <div>
            <div class="field mt-4">
                <span class="p-float-label">
                    <UserLookup :user-list="usersAvailable" class="w-full" inputId="lookup" @user-selected="setSelectedUser"></UserLookup>
                    <label for="lookup">Utilisateur</label>
                </span>
            </div>

            <div class="field text-center w-100">
                <SelectButton v-model="selectedRole" :options="roles" optionLabel="name" class="w-full m-auto" unselectable></SelectButton>
            </div>

            <div class="flex justify-content-around align-items-center">
                <Button label="Ajouter" severity="info" class="w-4" @click="addMember()"></Button>
                <Button label="Annuler" severity="danger" class="w-4" @click="setDialogVisible(false)"></Button>
            </div>

        </div>
        
    </Dialog>
    
</template>
  
<script lang="ts" setup>

const auth = useAuth();

const props = defineProps({
    modelValue: Array<Member>,
    usersAvailable: Array<any>
});

const emit = defineEmits<{
    (event: 'update:modelValue', payload: Ref<Array<Member>>): void,
}>();

export interface Member {
    userId: string,
    role: any,
    name: string | null,
    image: string | null,
};

// Add user dialog
const selectedUser: Ref<any | undefined> = ref();

const roles = [
    {name: "Développeur", role: "DEVELOPER"},
    {name: "Manager", role: "MANAGER"},
]
const selectedRole = ref(roles[0]);
const isDialogVisible = ref(false);

const setSelectedUser = (user: any) => {
    if (typeof user !== "string" && user !== null) {selectedUser.value = user;}
}

const setDialogVisible = (value: boolean) => {
    isDialogVisible.value = value;
    if (!value) {
        selectedRole.value = roles[0];
    }
}

const addMember = async () => {
    if (!selectedRole.value || !selectedUser.value)
        return;

    if (props.modelValue?.find(member => member.name === selectedUser.value?.name))
        return;

    props.modelValue?.push({
        userId: selectedUser.value.id,
        role: selectedRole.value.role,
        name: selectedUser.value.name,
        image: selectedUser.value.image
    });

    setDialogVisible(false);
}

</script>

<style scoped></style>
  