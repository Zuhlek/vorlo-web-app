/*
    https://vuetifyjs.com/en/components/file-inputs/
    https://www.youtube.com/watch?v=VqnJwh6E9ak&ab_channel=Academind
*/
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
                <v-btn variant="tonal" @click.prevent="submit">Update</v-btn>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>
import axios from 'axios'

const SERVER_API_BASE_URL_UPDATE_TEMPLATE = 'http://localhost:8080/api/v1/templates/'
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
            const response = await axios.get(`${SERVER_API_BASE_URL_UPDATE_TEMPLATE}${this.templateId}`);
            const templateData = response.data.data.templates;
            this.templateName = templateData.name;
            this.templateDescription = templateData.description;
            this.templateFileName = templateData.filePath.split("/")[1]; //nicht so schön, im auge behalten
        } catch (error) {
            console.error('Error fetching template metadata:', error);
        }
    },
    methods: {

        onFileSelected(event) {
            this.templateFile = event.target.files[0] //currently only one template at a time, so [0] is ok
        },
        async submit() {
            console.log(this.templateFile)
            console.log(this.templateName)
            console.log(this.templateDescription)
            if (!this.templateFile && !this.templateName && !this.templateDescription) {
                console.warn('Mindestens eines der Felder muss einen Wert haben.');
                return;
            }
            if (this.$refs.updateTemplateForm.validate()) { // check form validity before submitting
                const formData = new FormData();
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }

                formData.append('id', this.templateId); 
                formData.append('ownerId', 1);  //currently just 1, no user logic yet
                if (this.templateFile) {
                    formData.append('file', this.templateFile, this.templateFile.name);
                }
                if (this.templateName) {
                    formData.append('templateName', this.templateName);
                }
                if (this.templateDescription) {
                    formData.append('templateDescription', this.templateDescription);
                }
                console.log(`${SERVER_API_BASE_URL_UPDATE_TEMPLATE}${this.templateId}`)
                axios.put(`${SERVER_API_BASE_URL_UPDATE_TEMPLATE}${this.templateId}`, formData, config, {
                    onDownloadProgress: uploadEvent => {
                        console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%")
                    }
                })
                    .then((res) => {
                        console.log(res)
                        this.$refs.updateTemplateForm.reset()
                        this.templateFile = null;
                        this.templateName = null;
                        this.templateDescription = null;
                    })
                    .catch((error) => {
                        console.error(error);
                        this.errorAlert = true;
                    });
            }
        }
    }
}
</script>
