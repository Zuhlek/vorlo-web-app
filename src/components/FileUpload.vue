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

</template>

<script>

import axios from 'axios'
export default {
    name: 'file-upload',
    data() {
        return {
            selectedFile: null
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
             axios.post('http://localhost:8080/template/upload', formData)
            //  , {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     }
            // })
            .then((res) => {
                console.log(res)
            })
        }
    }
}
</script>
