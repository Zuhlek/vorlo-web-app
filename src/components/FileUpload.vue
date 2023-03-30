/*
    https://vuetifyjs.com/en/components/file-inputs/
    https://www.youtube.com/watch?v=VqnJwh6E9ak&ab_channel=Academind
*/
<template>

        <v-form v-model="valid" ref="newTemplateForm">
            <v-container>
                <v-row align="start">
                    <v-col>
                        <v-text-field label="Template name" variant="underlined" :rules="valueRequired"
                            v-model="templateName" />
                    </v-col>
                    <v-col>
                        <v-file-input label="Select template from files" variant="underlined"
                            accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            show-size 
                            :rules="fileRequired"
                            @change="onFileSelected">
                        </v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field label="Template description" variant="underlined" :rules="valueRequired"
                            v-model="templateDescription" />
                    </v-col>
                    <v-col>
                        <v-btn type="submit" variant="tonal" @click.prevent="submit" :disabled="!valid">Upload</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>

</template>

<script>

import axios from 'axios'
export default {
    name: 'file-upload',
    
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
            templateDescription: null
        }
    },
    methods: {
        onFileSelected(event) {
            this.templateFile = event.target.files[0] //currently only one template at a time, so [0] is ok
        },
        async submit() {
            console.log(this.$refs.newTemplateForm)
            if (this.$refs.newTemplateForm.validate()) { // check form validity before submitting
                const formData = new FormData();
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                formData.append('file', this.templateFile, this.templateFile.name);
                formData.append('templateName', this.templateName)
                formData.append('templateDescription', this.templateDescription)
                axios.post('http://localhost:8080/template/upload', formData, config, {
                    onDownloadProgress: uploadEvent => {
                        console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%")
                    }
                })
                    .then((res) => {
                        console.log(res)
                    })
            }
        }
    }
}
</script>
