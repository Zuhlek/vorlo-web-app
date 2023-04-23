<template>
  <div class="pa-6" v-if="!this.$store.state.projectWasSelected">Please launch a project
    <v-icon>mdi-launch</v-icon>
    from the projects overview page
    <v-icon>mdi-folder-plus-outline</v-icon>

  </div>
  <div v-else class="pa-6">
    <!-- DETAIL PANE als header bar, buttons für actions  -->

    <v-sheet class="d-flex justify-space-around">
      <v-label style="font-size: larger">Details for project </v-label>
      <v-spacer></v-spacer>
      <v-chip class="ma-2" size="x-large" color="green" text-color="white" @click="getTemplateDoc()">load preview</v-chip>
    </v-sheet>
    <br>
    <v-sheet rounded color="green-lighten-5" class="d-flex justify-space-around">
    </v-sheet>
    <br>
    <splitpanes class="default-theme" vertical>
      <pane min-size="20" max-size="70">
        <DynamicContentMap />
      </pane>
      <pane>
        <div ref="docxContainer"></div>
      </pane>
    </splitpanes>
  </div>
</template>


<script>
//https://antoniandre.github.io/splitpanes/
import DynamicContentMap from '@/components/other/DynamicContentMap.vue';
import axios from 'axios'
import * as docx from 'docx-preview';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
const SERVER_API_URL_CREATE_TEMPLATE = 'http://localhost:8080/api/v1/templates/'

export default {
  name: "detail-view",
  components: {
    DynamicContentMap,
    Splitpanes,
    Pane,
  },
  mounted() {
    if (this.$store.state.projectWasSelected) {
      this.getTemplateDoc();
    }
  },
  unmounted() {
    this.$store.state.selectedProject = null;
    this.$store.state.selectedProjectId = null;
    this.$store.state.projectWasSelected = false;
  },
  methods: {
    async getTemplateDoc() {
      axios.get(`${SERVER_API_URL_CREATE_TEMPLATE}${this.$store.state.selectedProject.template.id}/download-file`, {
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
    }

  },
};
</script>