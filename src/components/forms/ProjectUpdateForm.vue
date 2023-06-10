<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success" title="Successfully updated the project"
    @click:close="closeWholeDialog"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        title="Encountered an error when trying to update the project" @click:close="closeWholeDialog"></v-alert>

    <v-sheet v-if="showForm" rounded color="green-lighten-5">
        <v-form class="pa-6" ref="updateProjectForm">
            <v-text-field 
                label="Project name" 
                variant="underlined" 
                v-model="projectName" 
                :placeholder="projectName"
                />
            <v-text-field 
                label="Project description" 
                variant="underlined" 
                v-model="projectDescription" 
                :placeholder="projectDescription"
                />
            <v-container class="d-flex justify-center">
                <v-btn 
                    variant="tonal"
                    @click.prevent="submitUpdateForm"
                    >
                    Update
                </v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'project-update-form',
    emits: ['close-dialog'],
    props: {
        projectId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            projectName: null,
            projectDescription: null,
            errorAlert: false,
            successAlert: false,
            selectedItem: [],
            showForm: true,
        }
    },
    computed: {
        ...mapGetters(['selectedProject']),
    },
    async mounted() {
        try {
            await this.getProject(this.projectId)
            this.projectName = this.selectedProject.name;
            this.projectDescription = this.selectedProject.description;
        } catch (error) {
            console.error('Error getting project metadata:', error);
        }
    },

    methods: {
        ...mapActions(['getProject', 'updateProject']),

        async submitUpdateForm() {
            if (!this.projectName && !this.projectDocumentTemplateName) {
                console.warn('Mindestens eines der Felder muss einen Wert haben.');
                return;
            }
            if (this.$refs.updateProjectForm.validate()) { // check form validity before submitting
                try {
                    await this.updateProject({
                        projectId: this.projectId,
                        projectName: this.projectName, 
                        projectDescription: this.projectDescription
                    }) 
                    this.$refs.updateProjectForm.reset()
                    this.projectName = null;
                    this.projectDescription = null
                    this.successAlert = true;
                    this.showForm = false;
                } catch (error) {
                    this.errorAlert = true;
                }
            } 
        },
        closeWholeDialog() {
            this.successAlert = false;
            this.errorAlert = false;
            this.$emit('close-dialog');
        },
    }
}
</script>
