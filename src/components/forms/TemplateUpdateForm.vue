<template>
    <v-alert class="my-6" 
        v-model="successAlert" 
        closable 
        type="success" 
        title="Successfully updated template"
        @click:close="closeWholeDialog"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        title="Encountered an error when trying to update template" @click:close="closeWholeDialog"></v-alert>

    <v-sheet v-if="showForm" rounded color="green-lighten-5">
        <v-form class="pa-6" ref="updateTemplateForm">
            <v-file-input :label="templateFileName || 'Select template from files'" variant="underlined"
                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                show-size @change="onFileSelected" :placeholder="templateFileName">
            </v-file-input>
            <v-text-field label="Template description" variant="underlined" v-model="templateDescription"
                :placeholder="templateDescription" />
            <v-text-field label="Template name" variant="underlined" v-model="templateName" :placeholder="templateName" />
            <v-container class="d-flex justify-center">
                <v-btn variant="tonal" @click.prevent="submitUpdateForm">Update
                </v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'template-update-form',
    emits: ['close-dialog'],
    props: {
        templateId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            templateFile: null,
            templateFileName: null,
            templateName: null,
            templateDescription: null,
            errorAlert: false,
            successAlert: false,
            showForm: true,
        }
    },
    computed: {
        ...mapGetters(['templates', 'selectedTemplate']),
    },
    async mounted() {
        try {
            await this.getTemplate(this.templateId);
            this.templateName = this.selectedTemplate.name;
            this.templateDescription = this.selectedTemplate.description;
            this.templateFileName = this.selectedTemplate.filePath.split("/")[1];
        } catch (error) {
            console.error('Error getting template metadata:', error);
        }
    },
    methods: {
        ...mapActions(['updateTemplate', 'getTemplate']),

        onFileSelected(event) {
            this.templateFile = event.target.files[0];
        },

        async submitUpdateForm() {
            if (!this.templateFile && !this.templateName && !this.templateDescription) {
                console.warn('Mindestens eines der Felder muss einen Wert haben.');
                return;
            }
            if (this.$refs.updateTemplateForm.validate()) {
                try {
                    await this.updateTemplate({
                        templateId: this.templateId,
                        templateFile: this.templateFile,
                        templateName: this.templateName,
                        templateDescription: this.templateDescription,
                    });
                    this.$refs.updateTemplateForm.reset();
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
    },
}
</script>
