<template>
    <div>
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
                        <v-btn icon variant="plain" @click="editSelectedTemplate(item.id)">
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

        <v-dialog v-model="updateTemplateDialog" width="500">
            <template-update-form :template-id="selectedTemplateId" />
        </v-dialog>
    </div>
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
import TemplateUpdateForm from '../forms/TemplateUpdateForm.vue';

export default {
    name: 'template-list',
    components: {
        TemplateUpdateForm
    },
    data() {
        return {
            templates: null,
            updateTemplateDialog: false,
            selectedProjectId: -1
        }
    },
    mounted() {
        this.listUploadedTemplates()
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
        editSelectedTemplate(templateId) {
                if (templateId === -1) { return; }
                this.selectedTemplateId = templateId;
                this.updateTemplateDialog = true;
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
                    console.log(res)
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;

                    const contentDisposition = res.headers['content-disposition'];
                    let fileName = 'unknown';
                    if (contentDisposition) {
                        const fileNameMatch = contentDisposition.match(/filename="([^"]+)/);
                        if (fileNameMatch && fileNameMatch.length > 1) {
                            fileName = fileNameMatch[1];
                        }
                    }
                    link.setAttribute('download', fileName); // Hier können Sie den Dateinamen entsprechend dem heruntergeladenen Template anpassen.
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
