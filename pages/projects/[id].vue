<template>
  <div class="header" :style="{ '--color': `#${project?.color}` }">
    <div class="title">
      <h3>{{ project?.client?.name }}</h3>
      <h1>{{ project?.name }}</h1>
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
          ></TicketsCard>
        </div>
        <div class="create-ticket" @click="createTicketModal(ticketState.name)">
          Créer un ticket
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="isDialogVisible"
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
</template>

<script lang="ts" setup>
import { TicketCreationDTO } from '~/utils/server';
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

const isDialogVisible = ref(false);
const ticketStateToCreate = ref('');

function createTicketModal(ticketState: string) {
  ticketStateToCreate.value = ticketState;
  isDialogVisible.value = true;
}

async function submitTicket(dto: TicketCreationDTO) {
  await createTicket(id, dto);
  isDialogVisible.value = false;
  project.value = await getProject(id);
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
