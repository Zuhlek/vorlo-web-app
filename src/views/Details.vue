<template>
  <div class="pa-6" v-if="!this.selectedProject">Please launch a project
    <v-icon>mdi-launch</v-icon>
    from the projects overview page
    <v-icon>mdi-folder-plus-outline</v-icon>

  </div>
  <div v-else class="pa-6">
    <!-- DETAIL PANE als header bar, buttons für actions  -->

    <v-sheet class="d-flex justify-space-around">
      <v-label class="text-h5">
        #{{ this.selectedProject. id}} |
        {{ this.selectedProject.name }}
      </v-label>
      <v-spacer></v-spacer>
      <div>
              <v-chip class="ma-2" size="x-large" color="green" text-color="white" @click="applyNewContentMap()"
        v-if="changesHappened">
        <v-icon>mdi-content-save</v-icon>
      </v-chip>
      </div>
      <div>
        <v-chip class="ma-2" size="x-large" color="green" text-color="white" @click="applyAndDownload()">
        <v-icon>mdi-download</v-icon>
      </v-chip>
      </div>

    </v-sheet>
    <v-sheet rounded color="green-lighten-5" class="d-flex justify-space-around">
    </v-sheet>
    <br>
    <Splitpanes class="default-theme" vertical>
      <pane min-size="20" max-size="70">
        <DynamicContentMap @content-map-changed="onContentMapChanged" />
      </pane>
      <pane>
        <div ref="docxContainer"></div>
      </pane>
    </Splitpanes>
  </div>
</template>

<script>

import DynamicContentMap from '@/components/other/DynamicContentMap.vue';
import * as docx from 'docx-preview';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import { mapActions, mapGetters } from 'vuex';

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
      updatedContentMap: null,
    }

  },
  computed: {
    ...mapGetters(['selectedProject', 'docData', 'downloadData']),
  },
  async mounted() {

    this.loadPreview()
  },
  methods: {
    ...mapActions(['getTemplateDoc', 'getProject', 'updateContentMap', 'createAndDownloadTemplate' ]),
    async loadPreview() {
      try {
        await this.getTemplateDoc(this.selectedProject.template.id)
        .then(() => console.log("container " + this.$refs.docxContainer))
        console.log("docData " + this.docData)
        const container = this.$refs.docxContainer;
        console.log("container " + container)
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
        console.error('Error getting template document:', error);
      }
    },

    onContentMapChanged(updatedKeyValuePairs) {
      this.changesHappened = true;
      this.updatedContentMap = updatedKeyValuePairs.reduce((map, item) => {
        map[item.key] = item.value;
        return map;
      }, {});
    },
    async applyNewContentMap() {
      if (!this.updatedContentMap) return;
      try {
        await this.updateContentMap({
          templateId: this.selectedProject.template.id,
          updatedContentMap: this.updatedContentMap
        });

        this.changesHappened = false;
      } catch (error) {
        console.error('Error updating content map:', error);
        this.errorAlert = true;
      }
    },

    async applyAndDownload() {
      try {
        await this.createAndDownloadTemplate(this.selectedProject.id);
        const { data, headers } = this.downloadData
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        const fileName = headers["content-disposition"].match(/filename="(.+)"/)[1];
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        this.changesHappened = false;
      } catch (error) {
        console.error('Error creating and downloading template:', error);
        this.errorAlert = true;
      }
    },


  },
};
</script>