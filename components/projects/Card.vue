<template>
  <div class="project" :data-project-id="props.project.id">
    <h3>{{ props.project.name }}</h3>
    <p>
      {{ props.project.client.name }}
    </p>
    <div class="card flex justify-content-center">
      <AvatarGroup>
        <Avatar v-for="member in props.project.members.slice(0, 3)" :visible="true" :image="member.user.image" />
        <Avatar v-if="plusMember > 0" :label="'+' + String(plusMember)" shape="circle" size="large"
          style="background-color: '#9c27b0', color: '#ffffff'" />
      </AvatarGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  project: NonNullable<Awaited<ReturnType<typeof getProject>>>;
}>();

const memberNumber = props.project.members.length;
const plusMember = memberNumber - 3;

</script>

<style lang="scss" scoped>
.project {
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
