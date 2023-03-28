/*
    https://vuetifyjs.com/en/components/file-inputs/
    https://www.youtube.com/watch?v=VqnJwh6E9ak&ab_channel=Academind
*/

<template>
    <v-file-input label="Upload template" variant="solo"
        accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        show-size @change="onFileSelected">
    </v-file-input>
    <v-btn variant="tonal" @click="onUpload">Upload</v-btn>
    <br><br>
    <v-btn variant="tonal" @click="listUploadedTemplates">Load uploaded templates</v-btn>
    <v-table density="compact">
        <thead>
        <tr>
            <th class="text-left">
            #
            </th>
            <th class="text-left">
            Name
            </th>
            <th class="text-left">
            Description
            </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in templates"
            :key="item.id"
        >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
        </tr>
        </tbody>
    </v-table>

</template>

<script>

import axios from 'axios'
export default {
    name: 'file-upload',
    data() {
        return {
            selectedFile: null,
            templates: null
        }
    },
    methods: {
        onFileSelected(event) {
            console.log(event)
            this.selectedFile = event.target.files[0] //currently only one template at a time, so [0] is ok
        },
        async onUpload() {
            const formData = new FormData();
            formData.append('file', this.selectedFile, this.selectedFile.name);
            axios.post('http://localhost:8080/template/upload', formData, {
                onDownloadProgress: uploadEvent => {
                    console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%")
                }
            })
            .then((res) => {
                console.log(res)
            })
        },
        listUploadedTemplates(){
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
