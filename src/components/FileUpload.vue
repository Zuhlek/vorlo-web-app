/*
    https://vuetifyjs.com/en/components/file-inputs/
    https://www.youtube.com/watch?v=VqnJwh6E9ak&ab_channel=Academind
*/

<template>
    <v-file-input label="Upload template" variant="solo"
        accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        show-size @change="onFileSelected">
    </v-file-input>
    <div>
        <v-text-field label="Template name" variant="underlined" :rules="[rules.required]" @change="setTemplateName"/>
        <v-text-field label="Template description" variant="underlined" :rules="[rules.required]" @change="setTemplateDescription"/>
        <v-btn variant="tonal" @click="onUpload">Upload</v-btn>
    </div>

    <br><br>

    <v-table density="compact">
        <thead>
            <tr>
                <th class="text-left">
                    #
                </th>
                <th class="text-left">
                    Template name
                </th>
                <th class="text-left">
                    Template description
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in templates" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
            </tr>
        </tbody>
    </v-table>
    <br>
    <v-btn variant="tonal" @click="listUploadedTemplates">Load uploaded templates</v-btn>
</template>

<script>

import axios from 'axios'
export default {
    name: 'file-upload',
    data() {
        return {
            rules: {
                required: value => !!value || 'Field is required',
            },
            selectedFile: null,
            templates: null,
            templateName: null,
            templateDescription: null
        }
    },
    methods: {
        onFileSelected(event) {
            console.log(event)
            this.selectedFile = event.target.files[0] //currently only one template at a time, so [0] is ok
        },
        async onUpload() {
            const formData = new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            formData.append('file', this.selectedFile, this.selectedFile.name);
            formData.append('templateName', this.templateName)
            formData.append('templateDescription', this.templateDescription)
            console.log(formData)
            axios.post('http://localhost:8080/template/upload', formData, config, {
                onDownloadProgress: uploadEvent => {
                    console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%")
                }
            })
                .then((res) => {
                    console.log(res)
                })
        },
        setTemplateName(event) {
            console.log(event)
            this.templateName = event.target.value //currently only one template at a time, so [0] is ok
        },
        setTemplateDescription(event) {
            console.log(event)
            this.templateDescription = event.target.value //currently only one template at a time, so [0] is ok
        },
        listUploadedTemplates() {
            axios.get('http://localhost:8080/template/list')
                .then((res) => {
                    console.log(res);
                    this.templates = res.data.data.templates;
                })
                .catch((error) => {
                    console.error('Error fetching templates:', error);
                });
        }
    }
}
</script>
