<template>
    <div>
        <v-table density="compact">
            <thead class="table-header">
                <tr>
                    <th class="text-left">
                        Key
                    </th>
                    <th class="text-left">
                        Value
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in keyValuePairs" :key="item.key" class="table-row">
                    <td>{{ item.key }}</td>
                    <td class="py-4">
                        <v-text-field variant="solo" v-model="item.value" ></v-text-field>
                    </td>
                </tr>
            </tbody>
        </v-table>

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

export default {
    name: 'dynamic-content-map',
    data() {
        return {
            selectedProject: null,
            keyValuePairs: null,
        }
    },
    mounted() {
        this.getSelectedProject(this.$store.state.selectedProjectId)
    },
    methods: {
        getSelectedProject(projectId) {
            if(projectId == null) return;

            axios.get(`http://localhost:8080/api/v1/projects/${projectId}`)
                .then((res) => {
                    this.selectedProject = res.data.data.project
                    this.loadDynamicContentMapToList()
                })
                .catch((error) => {
                    console.error('Error fetching projects:', error);
                });
        },
        loadDynamicContentMapToList() {
            this.keyValuePairs = Object.entries(this.selectedProject.template.contentMap).map(([key, value]) => ({ key, value }));
        },
    }
}
</script>
