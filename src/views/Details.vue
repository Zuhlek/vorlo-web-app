<template>
  <div class="pa-6" v-if="!this.$store.state.projectWasSelected">Please launch a project
    <v-icon>mdi-launch</v-icon>
    from the projects overview page
    <v-icon>mdi-folder-plus-outline</v-icon>

  </div>
  <div v-else class="pa-6">
    <!-- DETAIL PANE als header bar, buttons für actions  -->

    <v-sheet class="d-flex justify-space-around">
      <v-label class="text-h5">
        #{{ this.$store.state.selectedProjectId }} |
        {{ this.$store.state.selectedProject.name }} </v-label>
      <v-spacer></v-spacer>
      <v-chip class="ma-2" size="x-large" color="green" text-color="white" @click="updateContentMap()"
        v-if="changesHappened">
        <v-icon>mdi-content-save</v-icon>
      </v-chip>
      <v-chip class="ma-2" size="x-large" color="green" text-color="white" @click="createAndDownloadTemplate()">
        <v-icon>mdi-download</v-icon>
      </v-chip>
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
//https://antoniandre.github.io/splitpanes/
import DynamicContentMap from '@/components/other/DynamicContentMap.vue';
import axios from 'axios'
import * as docx from 'docx-preview';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const SERVER_API_URL_CREATE_TEMPLATE = 'https://vorlo-api-app.onrender.com/api/v1/templates/'
const SERVER_API_URL_CREATE_PROJECT = 'https://vorlo-api-app.onrender.com/api/v1/projects/'

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
  mounted() {
    if (this.$store.state.projectWasSelected) {
      this.getTemplateDoc();
      console.log(this.changesHappened)
    }
  },
  unmounted() {
    this.$store.state.selectedProject = null;
    this.$store.state.selectedProjectId = null;
    this.$store.state.projectWasSelected = false;
  },
  methods: {
    async getTemplateDoc() {
      axios.get(`${this.$store.config.BACKEND_ENDPOINT_URL_TEMPLATES}${this.$store.state.selectedProject.template.id}/download-file`, {
        responseType: 'arraybuffer'
      })
        .then((res) => {
          const docData = res.data;
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
          docx.renderAsync(docData, container, null, options);
        })
        .catch(() => {
        })
    },
    onContentMapChanged(updatedKeyValuePairs) {
      this.changesHappened = true;
      this.updatedContentMap = updatedKeyValuePairs.reduce((map, item) => {
        map[item.key] = item.value;
        return map;
      }, {});
    },
    updateContentMap() {
      if (!this.updatedContentMap) return;

      axios.put(`${this.$store.config.BACKEND_ENDPOINT_URL_TEMPLATES}${this.$store.state.selectedProject.template.id}/content-map`, this.updatedContentMap)
        .then((res) => {
          console.log(res)
          this.changesHappened = false;
        })
        .catch((error) => {
          console.error(error);
          this.errorAlert = true;
        });
    },
    createAndDownloadTemplate() {
      axios.get(`${this.$store.config.BACKEND_ENDPOINT_URL_PROJECTS}${this.$store.state.selectedProjectId}/generate-document`, {
        responseType: "blob",
      })
        .then((res) => {
          console.log(res);
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          const fileName = res.headers["content-disposition"].match(/filename="(.+)"/)[1];
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
          this.changesHappened = false;
        })
        .catch((error) => {
          console.error(error);
          this.errorAlert = true;
        });
    }


  },
};
</script>