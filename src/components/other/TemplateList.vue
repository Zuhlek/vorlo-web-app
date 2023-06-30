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
                        <v-btn icon variant="plain" @click="deleteTemplate(item.id)">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                        <v-btn icon variant="plain" @click="downloadTemplate(item.id)">
                            <v-icon>mdi-download</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <br>

        <v-dialog v-model="updateTemplateDialog" width="500">
            <TemplateForm :template-id="selectedTemplateId" @close-dialog="updateTemplateDialog = false" />
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
import TemplateForm from '../forms/TemplateForm.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'template-list',
    components: {
        TemplateForm,
    },
    data() {
        return {
            updateTemplateDialog: false,
            selectedTemplateId: -1
        }
    },
    computed: {
        ...mapGetters(['templates', 'downloadedTemplate']),
    },
    mounted() {
        this.getTemplates();
    },

    methods: {

        ...mapActions(['getTemplates', 'deleteTemplate', 'downloadTemplate']),

        editSelectedTemplate(templateId) {
            if (templateId === -1) { return; }
            this.selectedTemplateId = templateId;
            this.updateTemplateDialog = true;
        },
    },
    watch: {
        downloadedTemplate(newValue) {
            if (newValue) {
                const { data, headers } = newValue;
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                const contentDisposition = headers['content-disposition'];
                let fileName = 'unknown';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="([^"]+)/);
                    if (fileNameMatch && fileNameMatch.length > 1) {
                        fileName = fileNameMatch[1];
                    }
                }
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }
        },
    },
}
</script>
