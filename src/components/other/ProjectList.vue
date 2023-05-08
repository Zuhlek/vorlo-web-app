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
                        <v-btn icon variant="plain" @click="deleteSelectedProject(item.id)">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>

                    </td>
                </tr>
            </tbody>
        </v-table>
        <br>

        <v-dialog v-model="updateProjectDialog" width="500">
            <project-update-form :project-id="selectedProjectId" />
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
import ProjectUpdateForm from '../forms/ProjectUpdateForm.vue';


export default {
    name: 'project-list',
    components: {
        ProjectUpdateForm
    },
    data() {
        return {
            projects: null,
            updateProjectDialog: false,
            selectedProjectId: -1
        }
    },
    mounted() {
        this.listUploadedProjects()
    },
    methods: {
        listUploadedProjects() {
            axios.get(this.$store.config.BACKEND_ENDPOINT_URL_PROJECTS)
                .then((res) => {
                    this.projects = res.data.data.projects;
                })
                .catch((error) => {
                    console.error('Error fetching projects:', error);
                });
        },
        async openProjectDetails(projectId){

            if(projectId == null) return;

            await axios.get(`${this.$store.config.BACKEND_ENDPOINT_URL_PROJECTS}${projectId}`)
                .then((res) => {
                    this.$store.state.selectedProject = res.data.data.project
                    this.$store.state.selectedProjectId = projectId;
                    this.$store.state.projectWasSelected = true;
                })
                .catch((error) => {
                    console.error('Error fetching projects:', error);
                });

            this.$router.push("/details");
        },
        editSelectedProject(projectId) {
            if (projectId === -1) { 
                return; 
            }
            this.selectedProjectId = projectId;
            this.updateProjectDialog = true;
        },
        deleteSelectedProject(projectId) {
            axios.delete(`${this.$store.config.BACKEND_ENDPOINT_URL_PROJECTS}${projectId}`)
                .then(() => {
                    this.listUploadedProjects();
                })
                .catch((error) => {
                    console.error('Error deleting projects:', error);
                });
        },
    }
}
</script>
