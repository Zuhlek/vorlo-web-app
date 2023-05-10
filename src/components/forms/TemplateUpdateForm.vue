<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success" title="Successfully updated template"
        :text="successText" @input="successAlert = false"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        title="Encountered an error when trying to update template" :text="errorText" @input="errorAlert = false"></v-alert>

    <v-sheet rounded color="green-lighten-5">
        <v-form class="pa-6" ref="updateTemplateForm">
            <v-file-input :label="templateFileName || 'Select template from files'" variant="underlined"
                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                show-size @change="onFileSelected" :placeholder="templateFileName">
            </v-file-input>
            <v-text-field label="Template description" variant="underlined" v-model="templateDescription"
                :placeholder="templateDescription" />
            <v-text-field label="Template name" variant="underlined" v-model="templateName" :placeholder="templateName" />
            <v-container class="d-flex justify-center">
                <v-btn variant="tonal" @click.prevent="submit">Update
                </v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>
import { mapActions } from 'vuex';


const SERVER_API_BASE_URL_UPDATE_TEMPLATE = 'https://vorlo-api-app.onrender.com/api/v1/templates/'

export default {
    name: 'template-update-form',
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

            errorText: null,
            errorAlert: false,
            successText: null,
            successAlert: false
        }
    },
    async mounted() {
        try {
            const templateData = await this.getTemplate(this.templateId);
            this.templateName = templateData.name;
            this.templateDescription = templateData.description;
            this.templateFileName = templateData.filePath.split("/")[1];
        } catch (error) {
            console.error('Error fetching template metadata:', error);
        }
    },
    methods: {
        ...mapActions(['updateTemplate', 'getTemplate']),
        onFileSelected(event) {
            this.templateFile = event.target.files[0];
        },
        async submit() {
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
                    this.successText = 'Template erfolgreich aktualisiert';
                    this.successAlert = true;
                } catch (error) {
                    this.errorText = error.message;
                    this.errorAlert = true;
                }
            }
        },
    },
}
</script>
