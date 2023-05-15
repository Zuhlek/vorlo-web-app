<template>
  <div class="pa-6">
    <v-sheet class="d-flex justify-space-around">
      <v-label style="font-size: larger">Projects</v-label>
      <v-spacer></v-spacer>
      <div v-sheet class="d-flex flex-row-reverse">
        <v-chip class="ma-2" size="x-large" color="green" text-color="white" @click="createNewProject">
          <v-icon>mdi-plus</v-icon>
        </v-chip>
      </div>
    </v-sheet>

    <v-dialog v-model="createProjectDialog" width="500">
      <ProjectCreationForm @close-dialog="createProjectDialog = false" />
    </v-dialog>
    <br>
    <ProjectList />

  </div>
</template>
  
  
<script>
import ProjectList from '@/components/other/ProjectList.vue';
import ProjectCreationForm from '@/components/forms/ProjectCreationForm.vue';

export default {
  name: "project-view",
  components: {
    ProjectList,
    ProjectCreationForm,
  },
  data() {
    return {
      createProjectDialog: false,
    }
  },
  methods: {
    createNewProject() {
      this.createProjectDialog = true;
    }
  }
};
</script>
    