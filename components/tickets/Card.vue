<template>
  <div class="ticket" :data-ticket-id="props.ticket.id">
    <h3>{{ props.ticket.name }}</h3>
    <p>
      {{ props.ticket.description }}
    </p>
    <div class="users">
      <img
        v-for="user in [props.ticket.reporter, props.ticket.assignee]"
        :key="user?.id"
        :src="user?.user.image ?? '/icons/user_icon.svg'"
        class="user"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  ticket: NonNullable<Awaited<ReturnType<typeof getTicket>>>;
}>();
</script>

<style lang="scss" scoped>
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
</style>
