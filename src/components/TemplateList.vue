<template>
    <v-table rounded density="compact">
        <thead class="table-header">
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
                <th class="text-left">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in templates" :key="item.id" class="table-row">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>
                    <v-btn icon variant="plain" @click="editSelectedItem(item.id)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon variant="plain" @click="deleteSelectedTemplate(item.id)">
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                    <v-btn icon variant="plain" @click="downloadSelectedTemplateAsFile(item.id)">
                        <v-icon>mdi-download</v-icon>
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
    <br>
    <v-btn variant="tonal" @click="listUploadedTemplates">Load uploaded templates</v-btn>
</template>

<style scoped>
.table-header {
    background-color: #C8E6C9;
}

.table-row {
    background-color: #E8F5E9;
}
</style>

<script>
import axios from 'axios'
export default {
    name: 'template-list',
    data() {
        return {
            templates: null,
        }
    },
    methods: {
        listUploadedTemplates() {
            axios.get('http://localhost:8080/api/v1/templates/')
                .then((res) => {
                    this.templates = res.data.data.templates;
                })
                .catch((error) => {
                    console.error('Error fetching templates:', error);
                });
        },
        editSelectedTemplate() {
            console.log("not yet implemented :)")
        },
        deleteSelectedTemplate(templateId) {
            axios.delete(`http://localhost:8080/api/v1/templates/${templateId}`)
                .then((res) => {
                    this.listUploadedTemplates();
                    console.log(res);
                })
                .catch((error) => {
                    console.error('Error deleting templates:', error);
                });
        },
        downloadSelectedTemplateAsFile(templateId) {
            axios.get(`http://localhost:8080/api/v1/templates/${templateId}/download-file`, { responseType: 'blob' })
                .then((res) => {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'template-file.docx'); // Hier können Sie den Dateinamen entsprechend dem heruntergeladenen Template anpassen.
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                })
                .catch((error) => {
                    console.error('Error fetching templates:', error);
                });
        }
    }
}
</script>
