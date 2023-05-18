<template>
  <div>
    <DataTable
      :value="modelValue"
      removable-sort
      table-style="min-width: 50rem"
    >
      <template #header>
        <div class="flex justify-content-between align-items-center pr-5">
          <h2>Utilisateurs</h2>
          <Button
            icon="pi pi-user-plus"
            class="my-2"
            severity="info"
            size="large"
            @click="setDialogVisible(true)"
          ></Button>
        </div>
      </template>

      <Column field="user" sortable header="Nom">
        <template #body="slotProps">
          <div class="flex align-items-center gap-4">
            <img
              :src="`${slotProps.data.user.image}`"
              style="width: 30px; border-radius: 50%"
            />
            <span>{{ slotProps.data.user.name }}</span>
          </div>
        </template>
      </Column>
      <Column field="role" sortable header="Role">
        <template #body="slotProps">
          <span>{{
            roles.find(({ role }) => role === slotProps.data.role)?.name
          }}</span>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="isDialogVisible"
    modal
    header="Ajouter un membre au projet"
    class="w-5"
    :draggable="false"
  >
    <div>
      <div class="field mt-4">
        <span class="p-float-label">
          <Lookup
            :list="usersAvailable"
            class="w-full"
            input-id="lookup"
            @selected="setSelectedUser"
          >
          </Lookup>
          <label for="lookup">Utilisateur</label>
        </span>
      </div>

      <div class="field text-center w-100">
        <SelectButton
          v-model="selectedRole"
          :options="roles.slice(1)"
          option-label="name"
          class="w-full m-auto"
          unselectable
        >
        </SelectButton>
      </div>

      <div class="flex justify-content-around align-items-center">
        <Button
          label="Ajouter"
          severity="info"
          class="w-4"
          @click="addMember()"
        ></Button>
        <Button
          label="Annuler"
          severity="danger"
          class="w-4"
          @click="setDialogVisible(false)"
        ></Button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
const auth = useAuth();

const props = defineProps<{
  modelValue: Exclude<
    Awaited<ReturnType<typeof getProject>>,
    undefined
  >["members"];
  usersAvailable: Awaited<ReturnType<typeof getUsers>>;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: typeof props.modelValue): void;
  (event: "memberAdded", payload: typeof props.modelValue[number]): void;
}>();

// Add user dialog
const selectedUser: Ref<any | undefined> = ref();

const roles: Array<{
  name: string;
  role: (typeof props.modelValue)[number]["role"];
}> = [
  { name: "Propriétaire", role: "OWNER" },
  { name: "Développeur", role: "DEVELOPER" },
  { name: "Gestionnaire", role: "MANAGER" },
];
const selectedRole = ref(roles[1]);
const isDialogVisible = ref(false);

const setSelectedUser = (user: any) => {
  if (typeof user !== "string" && user !== null) {
    selectedUser.value = user;
  }
};

const setDialogVisible = (value: boolean) => {
  isDialogVisible.value = value;
  if (!value) {
    selectedRole.value = roles[1];
  }
};

const addMember = async () => {
  if (!selectedRole.value || !selectedUser.value) return;

  if (
    props.modelValue?.find(
      (member) => member.user.name === selectedUser.value?.name
    )
  )
    return;

  const newMember = {
    id: "",
    role: selectedRole.value.role,
    user: {
      id: selectedUser.value.id,
      name: selectedUser.value.name,
      image: selectedUser.value.image,
    },
  }

  props.modelValue?.push(newMember);
  emit("memberAdded", newMember);

  setDialogVisible(false);
};
</script>

<style scoped></style>
