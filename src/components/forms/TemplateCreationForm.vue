/*
    https://vuetifyjs.com/en/components/file-inputs/
    https://www.youtube.com/watch?v=VqnJwh6E9ak&ab_channel=Academind
*/
<template>
    <v-alert class="my-6" v-model="successAlert" closable type="success"
        title="Successfully created new template" :text="successText" @input="successAlert = false"></v-alert>
    <v-alert class="my-6" v-model="errorAlert" closable type="error"
        title="Encountered an error when trying to create new template" :text="errorText" @input="errorAlert = false"></v-alert>

    <v-sheet rounded color="green-lighten-5">
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
import axios from 'axios'

const SERVER_API_URL_CREATE_TEMPLATE = 'https://vorlo-api-app.onrender.com/api/v1/templates/'
export default {
    name: 'template-create-form',

    data() {
        return {
            valueRequired: [
                value => !!value || 'Input is required',
            ],
            fileRequired: [
                file => !!file[0] || 'File is required' //currently only one template at a time, so [0] is ok
            ],
            valid: false, // initial value of form validation
            templateFile: null,
            templateName: null,
            templateDescription: null,
            errorText: null,
            errorAlert: false,
            successText: null,
            successAlert: false
        }
    },
    methods: {
        onFileSelected(event) {
            this.templateFile = event.target.files[0] //currently only one template at a time, so [0] is ok
        },
        async submit() {
            console.log(this.$refs.createTemplateForm)
            if (this.$refs.createTemplateForm.validate()) { // check form validity before submitting
                const formData = new FormData();
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                formData.append('file', this.templateFile, this.templateFile.name);
                formData.append('vorloProjectId', 0); // 0 are real templates, otherwise they are linked to an actual project 
                formData.append('vorloUserId', 1);  //currently just 1, no user logic yet
                formData.append('templateName', this.templateName);
                formData.append('templateDescription', this.templateDescription);
                axios.post(SERVER_API_URL_CREATE_TEMPLATE, formData, config)
                    .then((res) => {
                        this.$refs.createTemplateForm.reset()
                        this.templateFile = null;
                        this.templateName = null;
                        this.templateDescription = null;
                        this.successText = "[" + res.status + "]: " + res.statusText
                        this.successAlert = true;
                    })
                    .catch((err) => {
                        this.errorText = err.message;
                        this.errorAlert = true;
                    })
            }
        }
    }
}
</script>
