/*
    https://vuetifyjs.com/en/components/file-inputs/
    https://www.youtube.com/watch?v=VqnJwh6E9ak&ab_channel=Academind
*/
<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success" title="Successfully created new template"
    @click:close="closeWholeDialog"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        title="Encountered an error when trying to create new template" @click:close="closeWholeDialog"></v-alert>


    <v-sheet v-if="showForm" rounded color="green-lighten-5">
        <v-form v-model="valid" class="pa-6" ref="createTemplateForm">
            <v-file-input label="Select template from files" variant="underlined"
                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                show-size :rules="fileRequired" @change="onFileSelected">
            </v-file-input>
            <v-text-field label="Template description" variant="underlined" :rules="valueRequired"
                v-model="templateDescription" />
            <v-text-field label="Template name" variant="underlined" :rules="valueRequired" v-model="templateName" />
            <v-container class="d-flex justify-center">
                <v-btn type="submit" variant="tonal" @click.prevent="submit" :disabled="!valid">Upload</v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>

import { mapActions } from 'vuex';
export default {
    name: 'template-create-form',
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
            templateFile: null,
            templateName: null,
            templateDescription: null,
            errorAlert: false,
            successAlert: false
        }
    },
    methods: {
        ...mapActions(['createTemplate']),
        onFileSelected(event) {
            this.templateFile = event.target.files[0]
        },
        async submit() {
            if (this.$refs.createTemplateForm.validate()) {
                try {
                    await this.createTemplate({
                        templateFile: this.templateFile,
                        templateName: this.templateName,
                        templateDescription: this.templateDescription,
                    })
                    this.$refs.createTemplateForm.reset();
                    this.templateFile = null;
                    this.templateName = null;
                    this.templateDescription = null;
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
