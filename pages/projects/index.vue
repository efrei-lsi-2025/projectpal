<template>
    <div class="mx-20px">

        <div class="section">
            <label for="nameInput" class="title">Name</label>
            <InputText id="nameInput" v-model="name" />
            <ColorPicker v-model="color" />
        </div>

        <div class="section">
            <label for="clientInput" class="title">Client</label>
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

    </div>
</template>


<script setup lang="ts">
import TextArea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import ColorPicker from 'primevue/colorpicker'
import Chips from 'primevue/chips'

let name : Ref<string> = ref('')
let description : Ref<string> = ref('')
let color : Ref<string> = ref('f3a40b')
let ticketStates: Ref<Array<string>> = ref([])

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

label {
    display: inline-block;
    margin: 0.5rem 0;
}
</style>