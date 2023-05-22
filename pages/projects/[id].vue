<template>
  <div class="flex justify-content-end -mt-8 mb-6 mr-8 pt-2">
    <Button
      icon="pi pi-arrow-left"
      label="Retour"
      class="mr-3"
      size="small"
      @click="$router.back()"
    ></Button>
    <Button
      icon="pi pi-plus"
      label="Nouveau"
      class="mr-3"
      size="small"
      @click="navigateTo('create')"
    ></Button>
    <Button
      icon="pi pi-cog"
      label="Modifier"
      class=""
      size="small"
      @click="navigateTo(`update/${$route.params.id}`)"
    ></Button>
  </div>

  <div class="header" :style="{ '--color': `#${project?.color}` }">
    <div class="title">
      <h3>{{ project?.client?.name }}</h3>
      <h1>{{ project?.name }}</h1>
      <div>
        <AvatarGroup>
          <Avatar
            v-for="member in project?.members.slice(0, 5)"
            :key="member.id + 'Avatar'"
            :image="member.user.image"
            size="normal"
            shape="circle"
          />
          <Avatar
            size="normal"
            shape="circle"
            v-if="(project?.members.length ?? 0) > 5"
            :label="'+' + String((project?.members.length ?? 0) - 6)"
          />
        </AvatarGroup>
      </div>
    </div>
    <div class="description">
      <p>{{ project?.description }}</p>
    </div>
  </div>
  <div ref="columns" class="columns">
    <div
      v-for="ticketState in project?.ticketStates"
      :key="ticketState.name"
      class="column"
      :data-column-name="ticketState.name"
      @dragover.prevent
      @drop="drop"
    >
      <h2>{{ ticketState.name }}</h2>
      <h3 v-if="ticketState.tickets.length === 0" class="no-tickets">
        Aucun ticket
      </h3>
      <div class="tickets">
        <div class="scroll">
          <TicketsCard
            v-for="ticket in ticketState.tickets"
            :key="ticket.id"
            :ticket="ticket"
            :data-ticket-id="ticket.id"
            draggable="true"
            @dragstart="dragStart"
            @dragend="dragEnd"
            @click="
              modifyTicketModal(
                $event,
                ticket.id,
                ticket.state.name,
                ticket.assignee?.id
              )
            "
          ></TicketsCard>
        </div>
        <div class="create-ticket" @click="createTicketModal(ticketState.name)">
          Créer un ticket
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="isDialogVisibleAddTicket"
    modal
    header="Ajouter un ticket"
    class="w-5"
    :draggable="false"
  >
    <TicketsCreate
      :status="ticketStateToCreate"
      :members="project?.members"
      @submit="submitTicket"
    />
  </Dialog>

  <Dialog
    v-model:visible="isDialogVisibleModifyTicket"
    modal
    header="Modifier un ticket"
    class="w-5"
    :draggable="false"
  >
    <TicketsCreate
      :ticket="ticketToEdit"
      :assignee="ticketAssigneeToModify"
      :status="ticketStateToModify"
      :members="project?.members"
      @submit="submitModifiedTicket"
    />
  </Dialog>
</template>

<script lang="ts" setup>
import { TicketCreationDTO } from "~/utils/server";
const route = useRoute();

const id = route.params.id as string;
const project: Ref<Awaited<ReturnType<typeof getProject>> | null> = ref(null);

const columns = ref<HTMLDivElement | null>(null);
const dragging = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  project.value = await getProject(id);
});

const dragStart = (e: DragEvent) => {
  dragging.value = e.target as HTMLDivElement;
};

const dragEnd = (e: DragEvent) => {
  dragging.value = null;
};

const drop = async (e: DragEvent) => {
  if (!dragging.value) return;

  const column = e.currentTarget as HTMLDivElement;
  const ticket = dragging.value;

  const from =
    ticket.parentElement?.parentElement?.parentElement?.dataset.columnName;
  const to = column.dataset.columnName;

  const ticketId = ticket.dataset.ticketId;

  if (from === to || !ticketId) return;

  const fromState = project.value?.ticketStates.find(
    (state) => state.name === from
  );

  const toState = project.value?.ticketStates.find(
    (state) => state.name === to
  );

  if (!fromState || !toState) return;

  const ticketIndex = fromState.tickets.findIndex(
    (ticket) => ticket.id === Number(ticketId)
  );

  if (ticketIndex === -1) return;

  const ticketToMove = fromState.tickets.splice(ticketIndex, 1)[0];
  toState.tickets.push(ticketToMove);

  await updateTicket(ticketId, { state: to });
  project.value = await getProject(id);
};

const isDialogVisibleAddTicket = ref(false);
const isDialogVisibleModifyTicket = ref(false);
const ticketStateToCreate = ref("");
const ticketStateToModify = ref();
const ticketAssigneeToModify = ref();

const ticketToEditId = ref(0);

const allTickets = computed(() => {
  return [
    ...(project.value?.tickets ?? []),
    ...(project.value?.ticketStates.flatMap((ts) => ts.tickets) ?? []),
  ];
});

const ticketToEdit = computed(() => {
  return allTickets.value.find((it) => it.id === ticketToEditId.value);
});

function createTicketModal(ticketState: string) {
  ticketStateToCreate.value = ticketState;
  isDialogVisibleAddTicket.value = true;
}

async function submitTicket(dto: TicketCreationDTO) {
  await createTicket(id, dto);
  isDialogVisibleAddTicket.value = false;
  project.value = await getProject(id);
}

async function submitModifiedTicket(dto: TicketCreationDTO) {
  await updateTicket(ticketToEditId.value, dto);
  isDialogVisibleModifyTicket.value = false;
  project.value = await getProject(id);
}

async function modifyTicketModal(
  event: any,
  id: number,
  ticketState: string,
  assignee?: string
) {
  ticketToEditId.value = id;
  ticketStateToModify.value = ticketState;
  ticketAssigneeToModify.value = assignee;
  isDialogVisibleModifyTicket.value = true;
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .title {
    padding: 0 1rem;
    border-radius: 5px;
    border-left: 5px solid var(--color);
    background-color: white;

    h3 {
      font-size: 1rem;
      font-weight: 400;
    }
  }
}

.columns {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;

  overflow-x: scroll;
  overflow-y: hidden;

  .column {
    min-width: 325px;
    background-color: #e9e9e9;
    border-radius: 5px;
    padding: 1rem;
    min-height: 70vh;
    position: relative;

    h2 {
      font-size: 1.2rem;
      margin: 0.2rem 0;
      font-weight: 500;
    }

    &:hover .create-ticket {
      display: block;
    }

    .create-ticket {
      border-radius: 5px;
      border: 1px dotted #696969;
      padding: 0.25rem 1rem;
      margin-top: 0.5rem;
      color: #696969;
      font-weight: 300;
      font-size: 0.9rem;
      cursor: pointer;
      text-align: center;
      position: relative;
      display: none;
    }

    .no-tickets {
      color: #999;
      text-align: center;
      font-weight: 300;
      height: 100%;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .tickets {
      height: 65vh;

      .scroll {
        max-height: calc(100% - 2rem);
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }
  }
}
</style>
