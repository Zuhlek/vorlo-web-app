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
                <v-combobox density="compact" variant="solo" :items="this.templates" item-title="name" item-value="id"
                label="Select a template" v-model="selectedItem" :return-object="true" />
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
            projectTemplateName: null,
            errorAlert: false,
            successAlert: false,
            selectedItem: [],
            showForm: true,
        }
    },
    computed: {
        ...mapGetters(['templates', 'selectedProject']),
    },
    async mounted() {
        try {
            await this.getProject(this.projectId)
            this.projectName = this.selectedProject.name;
            this.projectTemplateName = this.selectedProject.template.name;
            this.getTemplates()
        } catch (error) {
            console.error('Error getting project metadata:', error);
        }
    },

    methods: {
        ...mapActions(['getTemplates', 'getProject', 'updateProject']),

        async submitUpdateForm() {
            if (!this.projectName && !this.projectTemplateName) {
                console.warn('Mindestens eines der Felder muss einen Wert haben.');
                return;
            }
            if (this.$refs.updateProjectForm.validate()) { // check form validity before submitting
                try {
                    await this.updateProject({
                        projectId: this.projectId,
                        vorloUserId: 1, 
                        templateId: this.selectedProject.template.id,
                        projectName: this.projectName, 
                    }) 
                    this.$refs.updateProjectForm.reset()
                    this.projectName = null;
                    this.projectTemplateName = null;
                    this.successAlert = true;
                    this.showForm = false;
                } catch (error) {
                    console.log(error)
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
