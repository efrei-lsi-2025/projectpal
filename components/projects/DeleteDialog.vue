<template>
  <div class="danger-zone">
    <div>
      <h4>
        Si vous souhaitez vraiment supprimer ce projet, veuillez taper :
        <p class="project-name ml-2">{{ props.projectName }}</p>
      </h4>
    </div>
    <div class="pb-3">
      <InputText class="w-full" v-model="textToEnter"></InputText>
    </div>
    <div class="flex justify-content-center pt-3">
      <Button
        class="w-full"
        severity="danger"
        label="Valider la suppression"
        @click="tryDelete"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  projectName: string;
}>();

const emit = defineEmits<{
  (event: "delete"): void;
}>();

const textToEnter = ref("");

const tryDelete = () => {
  if (textToEnter.value === props.projectName) {
    emit("delete");
  } else {
    textToEnter.value = "";
  }
};
</script>

<style scoped>
.project-name {
  color: #5c5c5c;
  font-weight: 600;
  font-style: oblique;
}

.p-inputtext,
.p-inputtext:enabled:hover,
.p-inputtext:enabled:focus {
  border: #5c5c5c 1px solid;
  background-color: #fff5f5;
  color: #5c5c5c;
  z-index: 1;
}

.danger-zone {
  padding: 0rem 2rem 1rem 2rem;
  background-color: #f83a3a1b;
  border: solid #c73030 2px;
  border-radius: 10px;
  color: #c73030;
}
</style>
