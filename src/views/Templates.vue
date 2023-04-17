<template>
  <div class="pa-6">
    <div class="d-flex align-center">
        <h2 >Templates</h2>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-plus" @click="createNewTemplate">  </v-btn>
        <v-dialog v-model="createTemplateDialog" width="500" @click:outside="closeDialog" @keydown.esc="closeDialog">
          <TemplateCreationForm  />
        </v-dialog>
    </div>
    <br>
    <TemplateList />
  </div>
</template>
  
<script>
import TemplateCreationForm from '@/components/TemplateCreationForm.vue';
import TemplateList from '@/components/TemplateList.vue';

export default {
  name: "templates-view",
  components: {
    TemplateCreationForm,
    TemplateList
  },
    data(){
      return{
        createTemplateDialog: false,
      }
    },
    methods: {
      createNewTemplate(){
        console.log("hello")
        this.createTemplateDialog = true;
      }
    }
};
</script>
  