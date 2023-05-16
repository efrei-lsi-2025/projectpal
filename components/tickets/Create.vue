<template>
  <div class="container">
    <form @submit.prevent="submitTicket">
      <div class="form-row">
        <div class="form-column">
          <label class="title" for="ticketName">Nom du ticket</label>
          <InputText
            id="ticketName"
            v-model="name"
            type="text"
            required
            class="input-field"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-column">
          <label class="title" for="description">Description</label>
          <TextArea
            id="description"
            v-model="description"
            required
            class="input-field"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-column field mt-4">
          <label class="title" for="assignedProject">Responsable</label>
          <span class="p-float-label">
            <Lookup
              :list="members?.map((member) => member.user)"
              option-label="name"
              class="w-full"
              required
              input-id="lookup"
              @selected="setAssignee"
            ></Lookup>
          </span>
        </div>
      </div>

      <Button
        id="submitButton"
        class="py-3 flex justify-content-around align-items-center"
        icon="pi pi-check"
        label="Valider"
        severity="success"
        @click="submitTicket"
      ></Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { TicketCreationDTO } from "~/utils/server";

const emit = defineEmits<{
  (event: "submit", payload: TicketCreationDTO): void;
}>();

const props = defineProps<{
  members:
    | Exclude<
        Awaited<ReturnType<typeof getProject>>,
        null | undefined
      >["members"]
    | undefined;
  status: string;
}>();

const name = ref();
const description = ref();
const assignee: Ref<Exclude<typeof props.members, undefined>[number] | null> =
  ref(null);

const setAssignee = ({ id }: { id: string }) => {
  assignee.value =
    props.members?.find((member) => member.user.id === id) ?? null;
};

const submitTicket = async () => {
  const ticket: TicketCreationDTO = {
    name: name.value,
    description: description.value,
    assignee: assignee.value?.user.id ?? "",
    status: props.status,
  };

  emit("submit", ticket);
};
</script>

<style scoped>
.container {
  margin-left: 30px;
  width: 500px;
}

.form-row {
  /* display: flex; */
  margin-bottom: 10px;
}

.form-column {
  flex: 1;
  margin-right: 10px;
}

.input-field {
  width: 100%;
  padding: 8px;
}

#submitButton {
  margin-right: 10px;
}

#cancelButton {
  margin-right: 10px;
}

.title {
  font-weight: bold;
}
</style>
