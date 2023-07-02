<template>
    <div>
        <div class="d-flex justify-space-around">
            <v-label class="text-h5">Projects</v-label>

            <v-spacer></v-spacer>

            <div class="d-flex flex-row-reverse">
                <v-chip class="ma-2" size="x-large" color="green" text-color="white" @click="createNewProject">
                    <v-icon>mdi-plus</v-icon>
                </v-chip>
            </div>
        </div>

        <v-dialog v-model="projectDialog" width="500">
            <ProjectForm :project-id="selectedProject ? selectedProject.id : null" @close-dialog="projectDialog = false" />
        </v-dialog>

        <v-table rounded density="compact">
            <thead class="table-header">
                <tr>
                    <th class="text-left">#</th>
                    <th class="text-left">Project name</th>
                    <th class="text-left">Project description</th>
                    <th class="text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in projects" :key="item.id" class="table-row">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        <v-btn icon variant="plain" @click="openProjectDetails(item.id)">
                            <v-icon>mdi-file-document-multiple-outline</v-icon>
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
        <br />


    </div>
</template>

<style scoped>
.table-header {
    background-color: #c8e6c9;
}

.table-row {
    background-color: #e8f5e9;
}
</style>

<script>
import ProjectForm from "../forms/ProjectForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "project-list",
    components: {
        ProjectForm,
    },
    data() {
        return {
            projectDialog: false,
        };
    },
    computed: {
        ...mapGetters(["projects", "selectedProject"]),
    },
    mounted() {
        this.getProjects();
    },
    methods: {
        ...mapActions(["getProjects", "getProject", "deleteProject"]),

        createNewProject() {
            this.$store.commit("setSelectedProject", null)
            this.projectDialog = true;
        },

        async openProjectDetails(projectId) {
            if (projectId == null) return;
            await this.getProject(projectId).then(() =>
                this.$router.push("/documents")
            );
        },

        async editSelectedProject(projectId) {
            if (projectId === -1) {
                return;
            }
            await this.getProject(projectId);
            this.projectDialog = true;
        },
    },
};
</script>
