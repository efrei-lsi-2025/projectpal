<template>
  <div>
    <DataTable
      :value="modelValue"
      removable-sort
      resizable-columns
      table-style="min-width: 50rem"
      :rows="5"
      paginator
    >
      <template #header>
        <div class="flex justify-content-between align-items-center pr-5">
          <h2>Utilisateurs</h2>
          <Button
            icon="pi pi-user-plus"
            class="my-2"
            severity="info"
            size="large"
            @click="setAddDialogVisible(true)"
          ></Button>
        </div>
      </template>

      <Column field="user" sortable header="Nom" style="min-width: 16rem">
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

      <Column field="role" sortable header="Role" style="min-width: 12rem">
        <template #body="slotProps">
          <span>{{
            roles.find(({ role }) => role === slotProps.data.role)?.name
          }}</span>
        </template>
      </Column>

      <Column style="min-width: 8rem; width: 10rem">
        <template #body="slotProps">
          <Button
            v-if="slotProps.data.role != 'OWNER'"
            icon="pi pi-pencil"
            rounded
            class="mr-2"
            severity="info"
            @click="(event) => askUpdateMember(event, slotProps.data)"
          ></Button>
          <Button
            v-if="slotProps.data.role != 'OWNER'"
            icon="pi pi-trash"
            rounded
            severity="danger"
            @click="(event) => askDeleteMember(event, slotProps.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>

  <!-- Dialog displayed when adding a member -->
  <Dialog
    v-model:visible="isAddDialogVisible"
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
          @click="setAddDialogVisible(false)"
        ></Button>
      </div>
    </div>
  </Dialog>

  <!-- Overlay displayed when updating a member's role -->
  <OverlayPanel ref="updateOverlay">
    <div>
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

      <div class="flex justify-content-center align-items-center">
        <Button
          icon="pi pi-check"
          severity="success"
          class="mr-4"
          rounded
          @click="updateMember()"
        ></Button>
        <Button
          icon="pi pi-times"
          severity="danger"
          rounded
          @click="updateOverlay.hide()"
        ></Button>
      </div>
    </div>
  </OverlayPanel>

  <!-- Overlay displayed when deleting a member -->
  <OverlayPanel ref="deleteOverlay">
    <div>
      <div class="text-center w-100">
        <p class="strong">Veuillez-confirmer pour supprimer.</p>
      </div>

      <div class="flex justify-content-center align-items-center">
        <Button
          icon="pi pi-check"
          severity="success"
          class="mr-4"
          rounded
          @click="deleteMember()"
        ></Button>
        <Button
          icon="pi pi-times"
          severity="danger"
          rounded
          @click="deleteOverlay.hide()"
        ></Button>
      </div>
    </div>
  </OverlayPanel>
</template>

<script lang="ts" setup>
const auth = useAuth();

// Setup props and events
const props = defineProps<{
  modelValue: Exclude<
    Awaited<ReturnType<typeof getProject>>,
    undefined
  >["members"];
  usersAvailable: Awaited<ReturnType<typeof getUsers>>;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: typeof props.modelValue): void;
  (event: "memberAdded", payload: (typeof props.modelValue)[number]): void;
  (event: "memberEdited", payload: (typeof props.modelValue)[number]): void;
  (event: "memberDeleted", payload: (typeof props.modelValue)[number]): void;
}>();

// Init variables
const roles: Array<{
  name: string;
  role: (typeof props.modelValue)[number]["role"];
}> = [
  { name: "Propriétaire", role: "OWNER" },
  { name: "Développeur", role: "DEVELOPER" },
  { name: "Gestionnaire", role: "MANAGER" },
];

const selectedUser: Ref<
  Exclude<Awaited<ReturnType<typeof getUsers>>, undefined>[number] | undefined
> = ref();
const selectedMember: Ref<
  | Exclude<
      Awaited<ReturnType<typeof getProject>>,
      undefined
    >["members"][number]
  | undefined
> = ref();
const selectedRole = ref(roles[1]);

const updateOverlay = ref();
const deleteOverlay = ref();
const isAddDialogVisible = ref(false);

const setSelectedUser = (user: string) => {
  if (typeof user !== "string" && user !== null) {
    selectedUser.value = user;
  }
};

// Control the add member dialog
const setAddDialogVisible = (value: boolean) => {
  isAddDialogVisible.value = value;
  if (!value) {
    selectedRole.value = roles[1];
  }
};

// Add a new member to the project
const addMember = async () => {
  if (!selectedRole.value || !selectedUser.value) return;

  // Check if the member already exists
  if (
    props.modelValue?.find(
      (member) => member.user.name === selectedUser.value?.name
    )
  ) {
    return;
  }

  // Create and push the new member
  const newMember = {
    id: "",
    role: selectedRole.value.role,
    user: {
      id: selectedUser.value.id,
      name: selectedUser.value.name,
      image: selectedUser.value.image,
    },
  };

  props.modelValue?.push(newMember);
  emit("memberAdded", newMember);
  setAddDialogVisible(false);
};

// Toggle the updateOverlay (and set the selected member and its current role)
const askUpdateMember = (
  event: any,
  member: Exclude<
    Awaited<ReturnType<typeof getProject>>,
    undefined
  >["members"][number]
) => {
  selectedMember.value = member;

  updateOverlay.value.toggle(event);
  if (selectedMember.value !== undefined) {
    selectedRole.value =
      roles.find(({ role }) => role === selectedMember.value?.role) ?? roles[1];
  }
};

// Update the role of the selected member
const updateMember = async () => {
  if (!selectedRole.value || !selectedMember.value) return;

  const currentMemberIndex = props.modelValue.indexOf(selectedMember.value);
  if (currentMemberIndex === -1) return;

  props.modelValue[currentMemberIndex].role = selectedRole.value.role;
  emit("memberEdited", selectedMember.value);
  updateOverlay.value.hide();
};

// Toggle the deleteOverlay (asks if the user really wants to delete the selectedMember)
const askDeleteMember = (
  event: any,
  member: Exclude<
    Awaited<ReturnType<typeof getProject>>,
    undefined
  >["members"][number]
) => {
  selectedMember.value = member;
  deleteOverlay.value.toggle(event);
};

// Delete the selected member
const deleteMember = async () => {
  if (!selectedMember.value) return;

  const currentMemberIndex = props.modelValue.indexOf(selectedMember.value);
  if (currentMemberIndex === -1) return;

  props.modelValue.splice(currentMemberIndex, 1);
  emit("memberDeleted", selectedMember.value);
  deleteOverlay.value.hide();
};
</script>

<style scoped></style>
