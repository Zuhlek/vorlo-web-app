<template>
  <div class="pa-6">
    <div >
      <v-sheet class="d-flex justify-space-around">
        <v-label style="font-size: larger">Templates</v-label>
        <v-spacer></v-spacer>
        <v-chip class="ma-2" size="x-large" color="green" text-color="white" @click="createNewTemplate">+</v-chip>
      </v-sheet>
    </div>
      <v-dialog v-model="createTemplateDialog" width="500">
        <TemplateCreationForm />
      </v-dialog>
    <br>
    <TemplateList />
  </div>
</template>
  
<script>
import TemplateCreationForm from '@/components/forms/TemplateCreationForm.vue';
import TemplateList from '@/components/other/TemplateList.vue';

export default {
  name: "templates-view",
  components: {
    TemplateCreationForm,
    TemplateList
  },
  data() {
    return {
      createTemplateDialog: false,
    }
  },
  methods: {
    createNewTemplate() {
      this.createTemplateDialog = true;
    }
  }
};
</script>
  