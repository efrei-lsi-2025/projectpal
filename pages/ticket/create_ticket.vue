<template>
  <div class="container">
    <form @submit.prevent="submit_ticket">

      <div class="form-row">
        <div class="form-column">
          <label class="title" for="ticketName">Nom du ticket:</label>
          <InputText type="text" id="ticketName" v-model="name" required class="input-field"/>
        </div>
  </div>

      <div class="form-row">
        <div class="form-column">
        <label class="title" for="description">Description:</label>
        <TextArea id="description" v-model="description" required class="input-field" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-column field mt-4 ">
            <label class="title" for="assignedProject">Projet assigné:</label>
            <span id="assignedProject" class="p-float-label">
                <UserLookup :user-list="allProjects" optionLabel="name" class="w-full" required inputId="lookup" @user-selected="assignedProjects"></UserLookup>
            </span>
        </div>

        <div class="form-column field mt-4">
            <label class="title" for="assignedProject">Utilisateur(s) :</label>
            <span class="p-float-label">
                <UserLookup :user-list="allDevelopers" optionLabel="name" class="w-full" required inputId="lookup" @user-selected="assignedDevelopers"></UserLookup>
            </span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-column">
          <label class="title w-full md:w-14rem" for="status">État :</label>
          <Listbox id="status" :options="allDevelopers" optionLabel="name" optionImage="image" v-model="status" required class="input-field">
            <!-- <template #option="allDevelopers">
              <div class="flex align-items-center">
                  <img src="image" style="width: 18px" />
                  <div>{{ name }}</div>
              </div>
            </template> -->
          </Listbox>
        </div>
        <div class="form-column">
          <label class="title" for="generatedId">ID généré:</label>
          <InputText ype="text" id="generatedId" v-model="generatedId" required class="input-field" />
        </div>
      </div>

      <Button class="py-3" icon="pi pi-check" label="Valider" id="submitButton" severity="success" @click="submit_ticket"></Button>
      <Button class="py-3" icon="pi pi-check" label="Annuler" id="cancelButton" severity="danger" @click="refresh_ticket"></Button>
    </form>
  </div>
</template>

<style scoped>
.container {
  margin-left: 30px;
  width: 600px;
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

<script setup lang="ts">
const auth = useAuth();

const allDevelopers = await useGetAllUsers();
const allProjects = await useGetAllProjects();

console.log("allProjects : ", allProjects);

const fetchData = async () => {
  // try {
  //   clientList.value = await $fetch('/api/ticket/clients');
  // } catch (error) {
  //   console.log("Couldn't reach the clients table");
  // }

  // try {
  //   projectList.value = await $fetch('/api/ticket/projects');
  // } catch (error) {
  //   console.log("Couldn't reach the projects table");
  // }
}

// try to fetch the data
fetchData();

// Fields of the form
const name = ref();
const description = ref();
const assignedProjects = ref();
const assignedDevelopers = ref();
const status = ref();
const generatedId = ref();

// List of all projects and all Users ( developeurs )
const developers = ref(allDevelopers);
const projects = ref(allProjects);


// Called to submit the ticket to the Database
const submit_ticket = async () => {

  const ticket = {
    name: name.value,
    description: description.value,
    assignedProjects: assignedProjects.value,
    assignedDevelopers: assignedDevelopers.value,
    status: status.value,
    generatedId: generatedId.value
  }

  //Log the Ticket values
  console.log('Ticket Values:', {
    name,
    description,
    assignedProjects,
    assignedDevelopers,
    status,
    generatedId,
  });
  //await $fetch('/api/ticket/create', { method: 'post', body: ticket });
}

// Function triggered when the submit button or cancel button are pressed
const refresh_ticket = async () => {

}
</script>
