<template>
  <div v-if="!this.selectedProject" class="pa-6">
    Please launch a project
    <v-icon>mdi-launch</v-icon>
    from the projects overview page
    <v-icon>mdi-folder-plus-outline</v-icon>
  </div>
  <div v-else class="pa-6">

    <DocumentList />
  </div>
</template>

<script>
import DocumentList from "@/components/other/DocumentList.vue";
import { mapGetters } from "vuex";

export default {
  name: "project-view",
  components: {
    DocumentList,
  },
  computed: {
    ...mapGetters(["selectedProject"]),
  },
};
</script>
