<template>
  <div>
    <div class="d-flex justify-space-around">
      <v-label class="text-h5">
        Documents for project '{{ this.selectedProject.name }} ({{
          this.selectedProject.description
        }})'
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
    </div>

    <v-dialog v-model="documentDialog" width="500">
      <DocumentForm
        :documentId="selectedDocument ? selectedDocument.id : null"
        @close-dialog="documentDialog = false"
      />
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
            <v-btn icon variant="plain" @click="editSelectedDocument(item.id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon variant="plain" @click="deleteDocument(item.id)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <br />
  </div>
</template>

<script>
import DocumentForm from "../forms/DocumentForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "document-list",
  components: {
    DocumentForm,
  },
  data() {
    return {
      documentDialog: false,
    };
  },
  computed: {
    ...mapGetters(["documents", "selectedProject", "selectedDocument"]),
  },
  mounted() {
    this.getDocumentsByProjectId(this.selectedProject.id);
  },
  methods: {
    ...mapActions(["getDocumentsByProjectId", "getDocument", "deleteDocument"]),
    createNewDocument() {
      this.$store.commit("setSelectedDocument", null)
      this.documentDialog = true;
    },
    async editSelectedDocument(documentId) {
      if (documentId === -1) {
        return;
      }
      await this.getDocument(documentId);
      this.documentDialog = true;
    },
    async openDocumentDetails(documentId) {
      await this.getDocument(documentId);
      this.$router.push("/details");
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
