<template>
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">

      <div class="form-row">
        <div class="form-column">
          <label class="title" for="ticketName">Nom du ticket:</label>
          <input type="text" id="ticketName" v-model="ticket.name" required class="input-field">
        </div>

        <div class="form-column">
          <label class="title" for="priority">Priorité:</label>
          <select id="priority" v-model="ticket.priority" required class="input-field">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-column">
        <label class="title" for="description">Description:</label>
        <textarea id="description" v-model="ticket.description" required class="input-field"></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-column">
          <label class="title" for="assignedProject">Projet assigné:</label>
          <input type="text" id="assignedProject" v-model="ticket.assignedProject" required class="input-field">
        </div>
        <div class="form-column">
          <label class="title" for="assignedDevelopers">Développeurs assignés:</label>
          <input type="text" id="assignedDevelopers" v-model="ticket.assignedDevelopers" required class="input-field">
        </div>
      </div>

      <div class="form-row">
        <div class="form-column">
          <label class="title" for="status">État:</label>
          <select id="status" v-model="ticket.status" required class="input-field">
            <option value="open">Open</option>
            <option value="inProgress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div class="form-column">
          <label class="title" for="generatedId">ID généré:</label>
          <input type="text" id="generatedId" v-model="ticket.generatedId" required class="input-field">
        </div>
      </div>

      <button type="submit" id="submitButton">Enregistrer</button>
      <button id="cancelButton">Annuler</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  margin-left: 30px;
  width: 500px;
}

.form-row {
  display: flex;
  margin-bottom: 10px;
}

.form-column {
  flex: 1;
  margin-right: 10px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #eee;
  color: #333;
  font-weight: bold;
}

#description {
  height: 100px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #eee;
  color: #333;
  border: none;
  cursor: pointer;
}

#submitButton {
    margin-right: 10px;
    background-color: #1FC91F;
}

#cancelButton {
    margin-right: 10px;
    background-color: #F83A3A;
}

.title {
    font-weight: bold;
}
</style>

<script>
export default {
  data() {
    return {
      ticket: {
        name: '',
        priority: '',
        description: '',
        assignedProject: '',
        assignedDevelopers: '',
        status: '',
        generatedId: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Access the ticket values
      const {
        name,
        priority,
        description,
        assignedProject,
        assignedDevelopers,
        status,
        generatedId
      } = this.ticket;


      //Log the Ticket values
      console.log('Ticket Values:', {
        name,
        priority,
        description,
        assignedProject,
        assignedDevelopers,
        status,
        generatedId
      });

      // Reset the form after submission

      this.ticket = {
        name: '',
        priority: '',
        description: '',
        assignedProject: '',
        assignedDevelopers: '',
        status: '',
        generatedId: ''
      };
    }
  }
};
</script>
