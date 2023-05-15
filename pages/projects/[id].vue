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
  <div class="columns" ref="columns">
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
      <div class="create-ticket" @click="createTicket">Créer un ticket</div>
      <div class="tickets">
        <div
          v-for="ticket in ticketState.tickets"
          :key="ticket.id"
          class="ticket"
          :data-ticket-id="ticket.id"
          draggable="true"
          @dragstart="dragStart"
          @dragend="dragEnd"
        >
          <h3>{{ ticket.name }}</h3>
          <p>
            {{ ticket.description }}
          </p>
          <div class="users">
            <img
              v-for="user in [ticket.reporter, ticket.assignee]"
              :key="user?.id"
              :src="user?.user.image"
              class="user"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const id = route.params.id as string;
let project = ref(await getProject(id));

const columns = ref<HTMLDivElement | null>(null);
const dragging = ref<HTMLDivElement | null>(null);

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

  const from = ticket.parentElement?.parentElement?.dataset.columnName;
  const to = column.dataset.columnName;

  if (from === to) return;

  const ticketId = ticket.dataset.ticketId;

  if (!ticketId) return;

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
      padding: 0.5rem 1rem;
      margin-top: 1rem;
      color: #696969;
      font-weight: 300;
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
      margin-top: 1rem;
      height: 100%;

      .ticket {
        background-color: white;
        border-radius: 5px;
        padding: 0.2rem 1rem;
        margin-top: 1rem;

        &.dragging {
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          cursor: grabbing;
        }

        &:hover {
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          cursor: grab;
        }

        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .users {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          padding: 0.5rem 0;
          margin-top: 0;

          .user {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
