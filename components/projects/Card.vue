<template>
  <div class="project">
    <h3>{{ props.project.projectName }}</h3>
    <p>
      {{ props.project.clientName }}
    </p>
    <div class="card flex justify-content-center">
      <AvatarGroup>
        <Avatar v-for="member in props.project.projectMembers.slice(0, 3)" :visible="true" :image="member.user.image" />
        <Avatar v-if="plusMember > 0" :label="'+' + String(plusMember)" shape="circle" size="large"
          style="background-color: '#9c27b0', color: '#ffffff'" />
      </AvatarGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { list } from 'postcss';

const props = defineProps<{
  // project: NonNullable<Awaited<ReturnType<typeof getUser>>>["projects"][number];
  project: {
    projectName: String;
    clientName: String;
    projectMembers: Exclude<Awaited<ReturnType<typeof getProject>>, undefined>["members"]
  }
}>();

const memberNumber = props.project.projectMembers.length;
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
