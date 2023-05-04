<template>
    <div class="mx-20px">

        <div class="section">
            <label for="nameInput" class="title">Nom du projet</label>
            <ColorPicker v-model="color" />
            <InputText id="nameInput" v-model="name" class="field" />
            
            <!-- Pour le client, remplacer le InputText par un autre composant, plus tard -->
            <label for="clientInput" class="title">Client</label>
            <InputText id="clientInput" class="field" />

        </div>

        <div class="section">
            <p class="title">Description</p>
            <TextArea v-model="description" autoResize rows="5" class="w-100 p-inputtext" />
        </div>

        <div class="section">
            <p class="title">Utilisateurs</p>
        </div>

        <div class="section">
            <p class="title">Catégories</p>
            <Chips v-model="ticketStates" />
        </div>
        
        <div class="section">
            <Button icon="pi pi-check" label="Valider" severity="success" @click="createProject"></Button>
        </div>

    </div>
</template>


<script setup lang="ts">
import TextArea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import ColorPicker from 'primevue/colorpicker'
import Chips from 'primevue/chips'
import Button from 'primevue/button'

let name : Ref<string> = ref('')
let description : Ref<string> = ref('')
let color : Ref<string> = ref('f3a40b')
let ticketStates: Ref<Array<string>> = ref([])

const createProject = () : void => { 
    console.log (
        `Name : ${name.value}
        Description: ${description.value}
        Categories: ${ticketStates.value}
        `
        )
    }

definePageMeta({
    layout: "projects",
})

</script>


<style lang="scss" scoped>
.section {
    padding: 1.5em 0;
}

.mx-20px {
    margin: 0px 20px;
}

.title {
    color: #000;
    font-weight: bold;
    font-size: 1.2rem;
}

.w-100 {
    width: 100%;
}

.section > .p-chips {
    display:block;
}

.section:first-of-type {
    display: grid;
    grid-template-columns: 1fr 1fr 4fr 1fr 3fr;
    column-gap: 20px;
}


label {
    display: inline-block;
    margin: 0.5rem 0;
}
</style>