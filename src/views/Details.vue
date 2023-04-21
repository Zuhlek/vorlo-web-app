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
      <v-chip class="ma-2" size="x-large" color="green" text-color="white">get as word</v-chip>
      <v-chip class="ma-2" size="x-large" color="green" text-color="white">get as pdf</v-chip>
      <v-chip class="ma-2" size="x-large" color="green" text-color="white">load preview</v-chip>
      <v-chip class="ma-2" size="x-large" color="green" text-color="white">load dynamic content list</v-chip>
    </v-sheet>
    <br>
    <v-sheet rounded color="green-lighten-5">
      <DynamicContentMap />
    </v-sheet>
    <br>
    <iframe 
    src="https://view.officeapps.live.com/op/embed.aspx?src=https://www.codexworld.com/files/Brochure.docx" 
    width="500px" 
    height="350px"
      
    frameborder="0"></iframe>
  </div>




  <!-- DETAIL VIEW unterhalt, links und rechts  -->
  <!-- links: CONTENT MAP -->
  <!-- rechts: PREVIEWER-->
</template>


<script>
import DynamicContentMap from '@/components/other/DynamicContentMap.vue';

export default {
  name: "detail-view",
  components: {
    DynamicContentMap,
  }
};
</script>