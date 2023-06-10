<template>
  <div class="pa-6" v-if="!this.selectedDocument">
    Please open a document
    <v-icon>mdi-content-duplicate</v-icon>
    after launching a project
    <v-icon>mdi-launch</v-icon>
    from the projects overview page
    <v-icon>mdi-folder-plus-outline</v-icon>
  </div>
  <div v-else class="pa-6">
    <!-- DETAIL PANE als header bar, buttons für actions  -->
    <v-sheet class="d-flex justify-space-around">
      <v-label class="text-h5">
        #{{ this.selectedDocument.id }} |
        {{ this.selectedDocument.name }}
      </v-label>
      <v-spacer></v-spacer>
      <div>
        <v-chip
          class="ma-2"
          size="x-large"
          color="green"
          text-color="white"
          @click="applyNewDynamicContents()"
          v-if="changesHappened"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-chip>
      </div>
      <div>
        <v-chip
          class="ma-2"
          size="x-large"
          color="green"
          text-color="white"
          @click="applyAndDownload()"
        >
          <v-icon>mdi-download</v-icon>
        </v-chip>
      </div>
    </v-sheet>
    <v-sheet
      rounded
      color="green-lighten-5"
      class="d-flex justify-space-around"
    >
    </v-sheet>
    <br />
    <Splitpanes class="default-theme" vertical>
      <pane min-size="20" max-size="70">
        <DynamicContentMap
          @dynamic-contents-changed="onDynamicContentsChanged"
        />
      </pane>
      <pane>
        <div ref="docxContainer"></div>
      </pane>
    </Splitpanes>
  </div>
</template>

<script>
import DynamicContentMap from "@/components/other/DynamicContentMap.vue";
import * as docx from "docx-preview";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "detail-view",
  components: {
    DynamicContentMap,
    Splitpanes,
    Pane,
  },
  data() {
    return {
      changesHappened: false,
      dynamicContent: null,
    };
  },
  computed: {
    ...mapGetters(["selectedDocument", "docData", "downloadData"]),
  },
  async mounted() {
    this.loadPreview();
  },
  methods: {
    ...mapActions([
      "getTemplateDoc",
      "getDocument",
      "updateDynamicContents",
      "createAndDownloadDocument",
    ]),
    async loadPreview() {
      try {
        await this.getTemplateDoc(this.selectedDocument.template.id);
        const container = this.$refs.docxContainer;
        const options = {
          inWrapper: true, //enables rendering of wrapper around document content
          ignoreWidth: true,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          experimental: false,
          useBase64URL: false,
        };
        docx.renderAsync(this.docData, container, null, options);
      } catch (error) {
        console.error("Error getting template document:", error);
      }
    },

    onDynamicContentsChanged(updatedDynamicContent) {
      this.changesHappened = true;
      this.dynamicContent = updatedDynamicContent;
    },

    async applyNewDynamicContents() {
      if (!this.dynamicContent) return;
      try {
        await this.updateDynamicContents({
          documentId: this.selectedDocument.id,
          dynamicContents: this.selectedDocument.dynamicContents,
        });

        this.changesHappened = false;
      } catch (error) {
        console.error("Error updating dynamic content:", error);
        this.errorAlert = true;
      }
    },

    async applyAndDownload() {
      try {
        await this.createAndDownloadDocument(this.selectedDocument.id);
        const { data, headers } = this.downloadData;
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        const fileName =
          headers["content-disposition"].match(/filename="(.+)"/)[1];
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        this.changesHappened = false;
      } catch (error) {
        console.error("Error creating and downloading template:", error);
        this.errorAlert = true;
      }
    },
  },
};
</script>
