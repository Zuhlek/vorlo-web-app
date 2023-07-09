<template>
    <div>
        <div class="d-flex justify-space-around">
            <v-label class="text-h5"> Templates </v-label>

            <v-spacer></v-spacer>

            <div class="d-flex flex-row-reverse">
                <v-chip class="ma-2" size="x-large" color="green" text-color="white" @click="createNewTemplate">
                    <v-icon>mdi-plus</v-icon>
                </v-chip>
            </div>
        </div>

        <v-dialog v-model="templateDialog" width="500">
            <TemplateForm :template-id="selectedTemplate ? selectedTemplate.id : null"
                @close-dialog="templateDialog = false" />
        </v-dialog>
        
        <v-table rounded density="compact">
            <thead class="table-header">
                <tr>
                    <th class="text-left">#</th>
                    <th class="text-left">Template name</th>
                    <th class="text-left">Template description</th>
                    <th class="text-left">Actions</th>
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
        <br />
    </div>
</template>

<script>
import TemplateForm from "../forms/TemplateForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "template-list",
    components: {
        TemplateForm,
    },
    data() {
        return {
            templateDialog: false,
        };
    },
    computed: {
        ...mapGetters(["templates", "downloadedTemplate", "selectedTemplate"]),
    },
    mounted() {
        this.getTemplates();
    },

    methods: {
        ...mapActions([
            "getTemplates",
            "deleteTemplate",
            "downloadTemplate",
            "getTemplate",
        ]),

        createNewTemplate() {
            this.$store.commit("setSelectedTemplate", null)
            this.templateDialog = true;
        },

        async editSelectedTemplate(templateId) {
            if (templateId === -1) {
                return;
            }
            await this.getTemplate(templateId);
            this.templateDialog = true;
        },
    },
    watch: {
        downloadedTemplate(newValue) {
            if (newValue) {
                const { data, headers } = newValue;
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement("a");
                link.href = url;
                const contentDisposition = headers["content-disposition"];
                let fileName = "unknown";
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="([^"]+)/);
                    if (fileNameMatch && fileNameMatch.length > 1) {
                        fileName = fileNameMatch[1];
                    }
                }
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }
        },
    },
};
</script>

<style scoped>
.table-header {
    background-color: #c8e6c9;
}

.table-row {
    background-color: #e8f5e9;
}
</style>
