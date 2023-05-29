<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success" title="Successfully created new project"
        @click:close="closeWholeDialog"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        title="Encountered an error when trying to create new project" @click:close="closeWholeDialog"></v-alert>

    <v-sheet v-if="showForm" rounded color="green-lighten-5">
        <v-form v-model="valid" class="pa-6" ref="createProjectForm">
            <v-text-field label="Project name" variant="underlined" :rules="valueRequired" v-model="projectName" />
            <v-combobox density="compact" variant="solo" :items="this.templates" item-title="name" item-value="id"
                label="Select a template" v-model="selectedItem" :return-object="true" />
            <v-container class="d-flex justify-center">
                <v-btn type="submit" variant="tonal" @click.prevent="submit" :disabled="!valid">Upload</v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'project-create-form',
    emits: ['close-dialog'],
    data() {
        return {
            valueRequired: [
                value => !!value || 'Input is required',
            ],
            fileRequired: [
                file => !!file[0] || 'File is required' //currently only one template at a time, so [0] is ok
            ],
            valid: false, // initial value of form validation
            showForm: true,
            projectName: null,
            errorAlert: false,
            successAlert: false,
            selectedItem: [],

        }
    },
    computed: {
        ...mapGetters(['templates']),
    },
    mounted() {
            this.getTemplates()
    },
    methods: {
        ...mapActions(['getTemplates', 'createProject']),

        async submit() {
            if (this.$refs.createProjectForm.validate()) { // check form validity before submitting
                try{
                    await this.createProject({
                        templateId: this.selectedItem.id, 
                        projectName: this.projectName})
                    this.$refs.createProjectForm.reset()
                    this.projectName = null;
                    this.projectDescription = null;
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
