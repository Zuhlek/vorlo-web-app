<template>
    <div class="pa-6">
      <v-card>Create new project
        <template v-slot:append>
            <v-btn icon>
                <v-icon>mdi-help</v-icon>
            </v-btn>
        </template>
      </v-card>
      <br>

    </div>
  </template>
    
  <script>

  
  export default {
    name: "project-view",
    components: {

    },
    data(){
      return{
        updateTemplateDialog: false,
      }
    }
  };
  </script>
    