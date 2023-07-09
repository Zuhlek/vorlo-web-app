<template>
  <v-alert
    class="my-6"
    v-model="successAlert"
    closable
    type="success"
    :title="
      isUpdateMode
        ? 'Successfully updated document'
        : 'Successfully created new document'
    "
    @click:close="closeWholeDialog"
  ></v-alert>
  <v-alert
    class="my-6"
    v-model="errorAlert"
    closable
    type="error"
    :title="
      isUpdateMode
        ? 'Encountered an error when trying to update document'
        : 'Encountered an error when trying to create new document'
    "
    @click:close="closeWholeDialog"
  ></v-alert>
  <v-sheet v-if="showForm" rounded color="green-lighten-5">
    <v-form v-model="valid" class="pa-6" ref="documentForm">
      <v-text-field
        :label="isUpdateMode ? 'Update document name' : 'Document name'"
        variant="solo"
        :rules="valueRequired"
        v-model="documentName"
        :placeholder="isUpdateMode ? documentName : null"
      />
      <v-text-field
        :label="
          isUpdateMode ? 'Update document description' : 'Document description'
        "
        variant="solo"
        :rules="valueRequired"
        v-model="documentDescription"
        :placeholder="isUpdateMode ? documentDescription : null"
      />
      <v-combobox
        density="compact"
        variant="solo"
        :items="this.templates"
        item-title="name"
        item-value="id"
        :label="isUpdateMode ? 'Update template' : 'Select template'"
        v-model="selectedItem"
        :return-object="true"
      />
      <v-container class="d-flex justify-center">
        <v-btn
          type="submit"
          variant="tonal"
          @click.prevent="submit"
          :disabled="!valid"
        >
          {{ isUpdateMode ? "Update" : "Create" }}
        </v-btn>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "document-form",
  emits: ["close-dialog"],
  props: {
    documentId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      valueRequired: [(value) => !!value || "Input is required"],
      valid: false,
      showForm: true,
      documentName: null,
      documentDescription: null,
      errorAlert: false,
      successAlert: false,
      selectedItem: [],
    };
  },
  computed: {
    ...mapGetters(["templates", "selectedProject", "selectedDocument"]),
    isUpdateMode() {
      return !!this.documentId;
    },
  },
  mounted() {
    this.getTemplates();
    if (this.isUpdateMode) {
      this.getDocument(this.documentId).then(() => {
        this.documentName = this.selectedDocument.name;
        this.documentDescription = this.selectedDocument.description;
        this.selectedItem = this.templates.find(
          (template) => template.id === this.selectedDocument.templateId
        );
      });
    }
  },
  methods: {
    ...mapActions([
      "getTemplates",
      "createDocument",
      "updateDocument",
      "getDocument",
    ]),

    async submit() {
      if (this.$refs.documentForm.validate()) {
        const document = {
          projectId: this.selectedProject.id,
          documentName: this.documentName,
          documentDescription: this.documentDescription,
        };
        if (this.selectedItem) {
          document.templateId = this.selectedItem.id;
        }
        try {
          if (this.isUpdateMode) {
            document.documentId = this.documentId;
            await this.updateDocument(document);
          } else {
            await this.createDocument(document);
          }
          this.$refs.documentForm.reset();
          this.documentName = null;
          this.documentDescription = null;
          this.successAlert = true;
          this.showForm = false;
        } catch (error) {
          this.errorAlert = true;
        }
      }
    },

    closeWholeDialog() {
      this.successAlert = false;
      this.errorAlert = false;
      this.$emit("close-dialog");
    },
  },
};
</script>
