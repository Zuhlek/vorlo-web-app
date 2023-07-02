<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success"
        :title="isUpdateMode ? 'Successfully updated the project' : 'Successfully created new project'"
        @click:close="closeWholeDialog"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        :title="isUpdateMode ? 'Encountered an error when trying to update the project' : 'Encountered an error when trying to create new project'"
        @click:close="closeWholeDialog"></v-alert>

    <v-sheet v-if="showForm" rounded color="green-lighten-5">
        <v-form v-model="valid" class="pa-6" ref="projectForm">
            <v-text-field :label="isUpdateMode ? 'Update project name' : 'Project name'" variant="underlined"
                :rules="valueRequired" v-model="projectName" :placeholder="isUpdateMode ? projectName : null" />
            <v-text-field :label="isUpdateMode ? 'Update project description' : 'Project description'" variant="underlined"
                :rules="valueRequired" v-model="projectDescription"
                :placeholder="isUpdateMode ? projectDescription : null" />
            <v-container class="d-flex justify-center">
                <v-btn type="submit" variant="tonal" @click.prevent="submitForm" :disabled="!valid">
                    {{ isUpdateMode ? 'Update' : 'Create' }}
                </v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'project-form',
    emits: ['close-dialog'],
    props: {
        projectId: {
            type: Number,
            default: null
        },
    },
    data() {
        return {
            valueRequired: [
                value => !!value || 'Input is required',
            ],
            valid: false, // initial value of form validation
            showForm: true,
            projectName: null,
            projectDescription: null,
            errorAlert: false,
            successAlert: false,
        }
    },
    computed: {
        ...mapGetters(['selectedProject']),
        isUpdateMode() {
            return !!this.projectId;
        }
    },
    async mounted() {
        if (this.isUpdateMode) {
            try {
                await this.getProject(this.projectId)
                this.projectName = this.selectedProject.name;
                this.projectDescription = this.selectedProject.description;
            } catch (error) {
                console.error('Error getting project metadata:', error);
            }
        }
    },
    methods: {
        ...mapActions(['getProject', 'createProject', 'updateProject']),

        async submitForm() {
            if (this.$refs.projectForm.validate()) {
                try {
                    const project = {
                        projectName: this.projectName,
                        projectDescription: this.projectDescription
                    }
                    if (this.isUpdateMode) {
                        project.projectId = this.projectId;
                        await this.updateProject(project)
                    } else {
                        await this.createProject(project)
                    }
                    this.$refs.projectForm.reset()
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