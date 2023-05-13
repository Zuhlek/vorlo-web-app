<template>
    <div>
        <v-table rounded density="compact">
            <thead class="table-header">
                <tr>
                    <th class="text-left">
                        #
                    </th>
                    <th class="text-left">
                        Project name
                    </th>
                    <th class="text-left">
                        Template name
                    </th>
                    <th class="text-left">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in projects" :key="item.id" class="table-row">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.template ? item.template.name : 'N/A' }}</td>
                    <td>
                        <v-btn icon variant="plain" @click="openProjectDetails(item.id)">
                            <v-icon>mdi-launch</v-icon>
                        </v-btn>
                        <v-btn icon variant="plain" @click="editSelectedProject(item.id)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon variant="plain" @click="deleteProject(item.id)">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>

                    </td>
                </tr>
            </tbody>
        </v-table>
        <br>

        <v-dialog v-model="updateProjectDialog" width="500">
            <project-update-form :project-id="selectedProjectId" @close-dialog="updateProjectDialog = false"/>
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
import ProjectUpdateForm from '../forms/ProjectUpdateForm.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'project-list',
    components: {
        ProjectUpdateForm
    },
    data() {
        return {
            updateProjectDialog: false,
            selectedProjectId: -1
        }
    },
    computed: {
        ...mapGetters(['projects', 'downloadedTemplate']),
    },
    mounted() {
        this.getProjects()
    },
    methods: {
        ...mapActions(['getProjects', 'getProject', 'deleteProject']),
        async openProjectDetails(projectId) {

            if (projectId == null) return;

            await this.getProject(projectId)
            .then(() =>
                this.$router.push("/details")
            )
        },
        editSelectedProject(projectId) {
            if (projectId === -1) { return; }
            this.selectedProjectId = projectId;
            this.updateProjectDialog = true;
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
