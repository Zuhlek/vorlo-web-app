<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success" title="Successfully updated the project"
        :text="successText" @input="successAlert = false"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        title="Encountered an error when trying to update the project" :text="errorText"
        @input="errorAlert = false"></v-alert>

    <v-sheet rounded color="green-lighten-5">
        <v-form class="pa-6" ref="updateProjectForm">
            <v-text-field 
                label="Project name" 
                variant="underlined" 
                v-model="projectName" 
                :placeholder="projectName"
                />
            <v-combobox density="compact" variant="solo" :items="templates" item-title="name" item-value="id"
                label="Select a template" v-model="selectedTemplate" :return-object="true"/>
            <v-container class="d-flex justify-center">
                <v-btn 
                    variant="tonal"
                    @click.prevent="submit"
                    >
                    Update
                </v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>
import axios from 'axios'

const SERVER_API_URL_CREATE_PROJECT = 'http://localhost:8080/api/v1/projects/'
export default {
    name: 'project-update-form',
    props: {
        projectId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            projectName: null,
            projectTemplateName: null,
            selectedTemplate: [],
            templates: [],

            errorText: null,
            errorAlert: false,
            successText: null,
            successAlert: false,


        }
    },
    async mounted() {
        try {
            const response = await axios.get(`${SERVER_API_URL_CREATE_PROJECT}${this.projectId}`);
            const projectData = response.data.data.projects;
            this.projectName = projectData.name;
            this.projectTemplateName = projectData.template.name;
            this.listUploadedTemplates()
        } catch (error) {
            console.error('Error fetching project metadata:', error);
        }
    },
    created() {
        this.listUploadedTemplates();
    },
    methods: {
        async submit() {
            if (!this.projectName && !this.projectTemplateName) {
                console.warn('Mindestens eines der Felder muss einen Wert haben.');
                return;
            }
            if (this.$refs.updateProjectForm.validate()) { // check form validity before submitting
                const formData = new FormData();
                formData.append('id', this.projectId);
                formData.append('vorloUserId', 1);  //currently just 1, no user logic yet
                formData.append('projectName', this.projectName);
                formData.append('templateId', this.selectedTemplate.id);
                axios.put(SERVER_API_URL_CREATE_PROJECT, formData)
                    .then((res) => {
                        this.$refs.createProjectForm.reset()
                        this.projectName = null;
                        this.projectTemplateName = null;
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
            axios.get('http://localhost:8080/api/v1/templates/')
                .then((res) => {
                    console.log(res)
                    this.templates = res.data.data.templates;
                })
                .catch((error) => {
                    console.error('Error fetching templates:', error);
                });
        },
    }
}
</script>
