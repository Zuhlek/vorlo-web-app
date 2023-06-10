<template>
  <div>
    <v-sheet class="d-flex justify-space-around">
      <v-label class="text-h5">
        {{ this.selectedProject.name }}
      </v-label>

      <v-spacer></v-spacer>
      <div class="d-flex flex-row-reverse">
        <v-chip
          class="ma-2"
          size="x-large"
          color="green"
          text-color="white"
          @click="createNewDocument"
        >
          <v-icon>mdi-plus</v-icon>
        </v-chip>
      </div>
    </v-sheet>

    <v-dialog v-model="createDocumentDialog" width="500">
      <document-creation-form @close-dialog="createDocumentDialog = false" />
    </v-dialog>
    <br />
    <v-table rounded density="compact">
      <thead class="table-header">
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Document name</th>
          <th class="text-left">Document description</th>
          <th class="text-left">Template name</th>
          <th class="text-left">Template description</th>
          <th class="text-left">Template type</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in documents" :key="item.id" class="table-row">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.template.name }}</td>
          <td>{{ item.template.description }}</td>
          <td>{{ item.template.templateType }}</td>
          <td>
            <v-btn icon variant="plain" @click="openDocumentDetails(item.id)">
              <v-icon>mdi-content-duplicate</v-icon>
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
import DocumentCreationForm from "../forms/DocumentCreationForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "document-list",
  components: {
    DocumentCreationForm,
  },
  data() {
    return {
      createDocumentDialog: false,
    };
  },
  computed: {
    ...mapGetters(["documents", "selectedProject"]),
  },
  mounted() {
    this.getDocumentsByProjectId(this.selectedProject.id);
  },
  methods: {
    ...mapActions(["getDocumentsByProjectId", "getDocument"]),
    createNewDocument() {
      this.createDocumentDialog = true;
    },
    async openDocumentDetails(documentId) {
      if (documentId == null) return;
      await this.getDocument(documentId).then(() =>
        this.$router.push("/details")
      );
    },
  },
};
</script>
