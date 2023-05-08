<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success" title="Successfully created new project"
        :text="successText" @input="successAlert = false"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        title="Encountered an error when trying to create new project" :text="errorText"
        @input="errorAlert = false"></v-alert>

    <v-sheet rounded color="green-lighten-5">
        <v-form v-model="valid" class="pa-6" ref="createProjectForm">
            <v-text-field label="Project name" variant="underlined" :rules="valueRequired" v-model="projectName" />
            <v-combobox density="compact" variant="solo" :items="templates" item-title="name" item-value="id"
                label="Select a template" v-model="selectedItem" :return-object="true"/>
            <v-container class="d-flex justify-center">
                <v-btn type="submit" variant="tonal" @click.prevent="submit" :disabled="!valid">Upload</v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>
import axios from 'axios'

export default {
    name: 'project-create-form',

    data() {
        return {
            valueRequired: [
                value => !!value || 'Input is required',
            ],
            fileRequired: [
                file => !!file[0] || 'File is required' //currently only one template at a time, so [0] is ok
            ],
            valid: false, // initial value of form validation
            projectName: null,
            errorText: null,
            errorAlert: false,
            successText: null,
            successAlert: false,
            selectedItem: [],
            templates: [],
        }
    },
    created() {
        this.listUploadedTemplates();
    },
    methods: {
        async submit() {
            if (this.$refs.createProjectForm.validate()) { // check form validity before submitting
                const formData = new FormData();
                formData.append('vorloUserId', 1);  //currently just 1, no user logic yet
                formData.append('projectName', this.projectName);
                formData.append('templateId', this.selectedItem.id);
                axios.post(this.$store.config.BACKEND_ENDPOINT_URL_PROJECTS, formData)
                    .then((res) => {
                        this.$refs.createProjectForm.reset()
                        this.projectName = null;
                        this.projectDescription = null;
                        this.successText = "[" + res.status + "]: " + res.statusText
                        this.successAlert = true;
                    })
                    .catch((err) => {
                        this.errorText = err.message;
                        this.errorAlert = true;
                    })
            }
        },
        listUploadedTemplates() {
            axios.get(this.$store.config.BACKEND_ENDPOINT_URL_TEMPLATES)
                .then((res) => {
                    this.templates = res.data.data.templates;
                })
                .catch((error) => {
                    console.error('Error fetching templates:', error);
                });
        },
    }
}
</script>
