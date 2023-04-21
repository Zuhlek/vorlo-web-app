<template>
  <div class="pa-6">
    <!-- DETAIL PANE als header bar, buttons für actions  -->
    <div class="pa-6">
      <v-sheet class="d-flex justify-space-around">
        <v-label style="font-size: larger">Details for project </v-label>
        <v-spacer></v-spacer>
        <v-chip class="ma-2" size="x-large" color="green" text-color="white">get as word</v-chip>
        <v-chip class="ma-2" size="x-large" color="green" text-color="white">get as pdf</v-chip>
        <v-chip class="ma-2" size="x-large" color="green" text-color="white">load preview</v-chip>
        <v-chip class="ma-2" size="x-large" color="green" text-color="white">load dynamic content list</v-chip>
      </v-sheet>
    </div>
    <div class="pa-6">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-sheet rounded color="green-lighten-5" class="fill-height">links</v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet rounded color="green-lighten-5" class="fill-height">rechts</v-sheet>
        </v-col>
      </v-row>
    </div>


  </div>

  <!-- DETAIL VIEW unterhalt, links und rechts  -->
  <!-- links: CONTENT MAP -->
  <!-- rechts: PREVIEWER-->
</template>


<script>
export default {
  name: "detail-view",
  props: {
    selectedProjectId: {
      type: Number,
      required: true,
    },
  },
};
</script>